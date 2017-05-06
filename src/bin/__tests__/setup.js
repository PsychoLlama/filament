/* eslint-disable no-underscore-dangle, no-sync */
import discover from 'hue-connect';
import {join} from 'path';
import fs from 'fs';

import '../setup';

jest.useFakeTimers();
jest.mock('hue-connect');
jest.mock('fs');

describe('Bridge setup', () => {
  const [callback] = discover.mock.calls[0];
  const token = Promise.resolve('API token');

  const createBridge = (fields = {}) => ({
    connect: jest.fn().mockReturnValue(token),
    ip: '192.168.1.42',

    ...fields,
  });

  beforeEach(() => discover.cancel.mockReset());

  it('discovers bridges', () => {
    expect(discover).toHaveBeenCalledWith(expect.any(Function));
  });

  it('connects to bridges', () => {
    const token = Promise.resolve('API token');

    const bridge = createBridge({
      connect: jest.fn().mockReturnValue(token),
    });

    callback(bridge);

    expect(bridge.connect).toHaveBeenCalledWith(expect.any(Object));
  });

  it('ends the search when a token is acquired', async () => {
    const bridge = createBridge();

    await callback(bridge);

    expect(discover.cancel).toHaveBeenCalled();
  });

  it('prints the error message if the code is unrecognized', async () => {
    const error = new Error('Fake error in the bridge setup tests.');
    error.code = 105;

    const bridge = createBridge({
      connect: jest.fn().mockReturnValue(Promise.reject(error)),
    });

    const spy = jest.fn();
    await callback(bridge).catch(spy);

    expect(setTimeout).not.toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(error);
  });

  it('retries when the bridge fails', async () => {
    const error = new Error('User failed to press link button.');
    error.code = 101;
    const fail = Promise.reject(error);

    const bridge = createBridge({
      connect: jest.fn().mockReturnValue(fail),
    });

    await callback(bridge);

    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Number),
      bridge,
    );
  });

  it('flushes the registration to disk when done', async () => {
    const bridge = createBridge();
    await callback(bridge);

    const deets = JSON.stringify({
      token: await token,
      ip: bridge.ip,
    }, null, 2);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      join(__dirname, '../../../bridge.json'),
      deets,
    );
  });
});
