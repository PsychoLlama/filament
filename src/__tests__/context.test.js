import fetch from 'node-fetch';

import { createHueLoaders, huerl, HueError } from '../context';
import bridge from '../../bridge';

jest.mock('node-fetch', () => jest.fn());

describe('Hue http', () => {
  let hue;

  afterEach(() => fetch.mockReset());
  beforeEach(() => {
    hue = createHueLoaders();
    fetch.mockImplementation(async () => ({
      json: async () => ({ result: true }),
    }));
  });

  const createError = (merge = {}) => ({
    error: {
      type: 3,
      address: '/lights/8',
      description: 'resource, /lights/8, not available',
      ...merge,
    },
  });

  describe('url formatter', () => {
    const base = `http://${bridge.ip}/api/${bridge.token}`;
    it('returns the root url by default', () => {
      const url = huerl();

      expect(url).toBe(`${base}/`);
    });

    it('joins the path', () => {
      const url = huerl('groups/2');

      expect(url).toBe(`${base}/groups/2`);
    });

    it('throws if the path is invalid', () => {
      const fail = () => huerl(null);

      expect(fail).toThrow(/(url|path)/i);
    });
  });

  describe('put()', () => {
    it('sends a fetch action', () => {
      const data = { name: 'New light name' };
      hue.put('light/1', data);

      expect(fetch).toHaveBeenCalledWith(huerl('light/1'), {
        body: JSON.stringify(data),
        method: 'PUT',
      });
    });

    it('resolves with the json data', async () => {
      const result = await hue.put('light/1', {});

      expect(result).toEqual({ result: true });
    });

    it('fails if the response contains errors', async () => {
      const errors = [createError()];
      fetch.mockImplementation(async () => ({
        json: async () => errors,
      }));

      const spy = jest.fn();
      await hue.put('lights/1', { name: 'New light name' }).catch(spy);

      expect(spy).toHaveBeenCalledWith(expect.any(HueError));
    });
  });

  describe('get()', () => {
    it('sends a fetch action', async () => {
      await hue.get('groups/2');

      expect(fetch).toHaveBeenCalledWith(huerl('groups/2'));
    });

    it('resolves with the data', async () => {
      const result = await hue.get('groups/3');

      expect(result).toEqual({ result: true });
    });

    it('fails if the response contains an error', async () => {
      const spy = jest.fn();
      const errors = [createError()];

      fetch.mockImplementation(async () => ({
        json: async () => errors,
      }));

      await hue.get('groups/4').catch(spy);

      expect(spy).toHaveBeenCalled();
      const [error] = spy.mock.calls[0];
      const actual = errors[0].error;

      expect(error).toEqual(expect.any(HueError));
      expect(error.message).toContain(actual.description);
      expect(error.address).toBe(actual.address);
      expect(error.code).toBe(actual.type);
    });

    it('returns the results if the endpoint returns an array', async () => {
      const results = [{ notAnError: true }];

      fetch.mockImplementation(async () => ({
        json: async () => results,
      }));

      const result = await hue.get('groups/4');

      expect(result).toBe(results);
    });

    it('sets a default error message', async () => {
      const spy = jest.fn();
      const errors = [createError({ description: undefined })];

      fetch.mockImplementation(async () => ({
        json: async () => errors,
      }));

      await hue.get('groups/5').catch(spy);

      expect(spy).toHaveBeenCalled();
      const [error] = spy.mock.calls[0];

      expect(error).toEqual(expect.any(HueError));
      expect(error.message).toMatch(/mysterious/i);
    });

    it('does not request the same resource twice', async () => {
      await hue.get('groups/5');
      await hue.get('groups/5');

      await hue.get('lights/10');
      await hue.get('lights/10');

      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it('only counts cached requests the first time', async () => {
      expect(hue.getRequestStats().requests).toHaveLength(0);

      await hue.get('schedules/10');
      await hue.get('schedules/10');
      await hue.get('schedules/10');

      expect(hue.getRequestStats().requests).toHaveLength(1);
    });
  });

  describe('post()', () => {
    it('sends a fetch action', () => {
      const data = { id: 'some-weird-id' };
      hue.post('lights', data);

      expect(fetch).toHaveBeenCalledWith(huerl('lights'), {
        body: JSON.stringify(data),
        method: 'POST',
      });
    });

    it('resolves with the data', async () => {
      const data = await hue.post('lights', { id: 'another-light' });

      expect(data).toEqual({ result: true });
    });

    it('fails if the result contains an error', async () => {
      const errors = [createError()];
      fetch.mockImplementation(async () => ({
        json: async () => errors,
      }));

      const spy = jest.fn();
      await hue.post('lights', { id: 'cool-beans' }).catch(spy);

      expect(spy).toHaveBeenCalledWith(expect.any(HueError));
    });
  });

  describe('metrics', () => {
    it('clones the stats object', () => {
      const stats = hue.getRequestStats();
      stats.requests = null;

      expect(hue.getRequestStats()).toEqual({
        requests: [],
      });
    });

    it('includes request timing', async () => {
      await hue.post('lights/no', { jk: 'no such endpoint' });
      await hue.put('lights/10', { name: 'Updated' });
      await hue.get('lights/5');

      const stats = hue.getRequestStats();
      expect(stats.requests).toEqual([
        { method: 'POST', endpoint: 'lights/no', elapsed: expect.any(Number) },
        { method: 'PUT', endpoint: 'lights/10', elapsed: expect.any(Number) },
        { method: 'GET', endpoint: 'lights/5', elapsed: expect.any(Number) },
      ]);
    });
  });
});
