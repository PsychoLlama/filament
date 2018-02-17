import Dataloader from 'dataloader';
import invariant from 'invariant';
import fetch from 'node-fetch';
import clone from 'clone';

import bridge from '../bridge.json';

// It's a Hue-RL (just like a URL, but a HueRL).
export const huerl = (path = '') => {
  invariant(
    typeof path === 'string',
    `Hue URL path is invalid. Got "${path}".`,
  );

  return `http://${bridge.ip}/api/${bridge.token}/${path}`;
};

/**
 * Massages data from Hue error responses.
 * @class
 */
export class HueError extends Error {
  /**
   * @param  {Object} source - The error object returned from hue.
   */
  constructor(source) {
    const { description = 'Mysterious, no error message.' } = source;

    super(`Hue bridge: ${description}`);

    this.address = source.address;
    this.code = source.type;
  }
}

const checkResultsForErrors = results => {
  if (!Array.isArray(results)) {
    return results;
  }

  results.forEach(result => {
    if (result && result.error) {
      throw new HueError(result.error);
    }
  });

  return results;
};

const stopwatch = () => {
  const start = Date.now();

  return () => Date.now() - start;
};

export const createHueLoaders = () => {
  const stats = {
    requests: [],
  };

  const loader = new Dataloader(urls => {
    const requests = urls.map(async path => {
      const url = huerl(path);

      const time = stopwatch();
      const response = await fetch(url);

      stats.requests.push({
        elapsed: time(),
        endpoint: path,
        method: 'GET',
      });

      return response.json();
    });

    return Promise.all(requests);
  });

  return {
    /**
     * GET request to hue.
     * @param  {String} [url] - Relative URL path.
     * @return {Promise<Object>} - HTTP response.
     */
    get: async url => {
      const json = await loader.load(url);

      return checkResultsForErrors(json);
    },

    /**
     * PUT request to hue.
     * @param  {String} [path] - Relative URL path.
     * @param  {Object} patch - JSON data.
     * @return {Promise<Object>} - HTTP response.
     */
    put: async (path, patch) => {
      const url = huerl(path);

      const time = stopwatch();
      const response = await fetch(url, {
        body: JSON.stringify(patch),
        method: 'PUT',
      });

      const json = await response.json();

      stats.requests.push({
        elapsed: time(),
        endpoint: path,
        method: 'PUT',
      });

      return checkResultsForErrors(json);
    },

    /**
     * POST request to hue.
     * @param  {String} [path] - Relative URL path.
     * @param  {Object} data - JSON data.
     * @return {Promise<Object>} - HTTP response.
     */
    post: async (path, data) => {
      const url = huerl(path);

      const time = stopwatch();

      const response = await fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
      });

      const json = await response.json();

      stats.requests.push({
        elapsed: time(),
        endpoint: path,
        method: 'POST',
      });

      return checkResultsForErrors(json);
    },

    /**
     * Getter for performance-related metrics. Deep cloned
     * because I have no trust.
     * @return {Object} - Request counts, timing, etc.
     */
    getRequestStats: () => clone(stats),
  };
};
