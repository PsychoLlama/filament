import fetch from 'node-fetch';

import { hue, huerl } from '../context';
import bridge from '../../bridge';

jest.mock('node-fetch', () => jest.fn());

describe('Hue http', () => {
  afterEach(() => fetch.mockReset());
  beforeEach(() => {
    fetch.mockImplementation(async () => ({
      json: async () => ({ result: true }),
    }));
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
  });

  describe('get()', () => {
    it('sends a fetch action', () => {
      hue.get('groups/2');

      expect(fetch).toHaveBeenCalledWith(huerl('groups/2'));
    });

    it('resolves with the data', async () => {
      const result = await hue.get('groups/3');

      expect(result).toEqual({ result: true });
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
  });
});
