#!/usr/bin/env node
/* eslint-disable no-use-before-define, no-sync */
import discover from 'hue-connect';
import { hostname } from 'os';
import { join } from 'path';
import fs from 'fs';

const search = discover(acquireToken);

/**
 * Flushes the API key to disk.
 * @private
 * @param  {Bridge} bridge - A hue bridge.
 * @param  {String} token - Hue API token.
 * @return {undefined}
 */
const complete = ({ ip }, token) => {
  const config = JSON.stringify({ token, ip }, null, 2);
  const file = join(__dirname, '../../bridge.json');

  fs.writeFileSync(file, config);
};

/**
 * Attempts to get an API token from the bridge.
 * @private
 * @param  {Bridge} bridge - Hue bridge.
 * @return {Promise} - Resolves when the request finishes.
 */
async function acquireToken(bridge) {
  try {
    const token = await bridge.connect({
      deviceName: hostname(),
      appName: 'filament',
    });

    search.cancel();
    complete(bridge, token);
  } catch (error) {
    if (error.code !== 101) {
      throw error;
    }

    // Try again later.
    setTimeout(acquireToken, 1000, bridge);
  }
}
