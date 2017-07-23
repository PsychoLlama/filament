import invariant from 'invariant';
import fetch from 'node-fetch';

import bridge from '../bridge.json';

// It's a Hue-RL (just like a URL, but a HueRL).
export const huerl = (path = '') => {
  invariant(typeof path === 'string',
    `Hue URL path is invalid. Got "${path}".`);

  return `http://${bridge.ip}/api/${bridge.token}/${path}`;
};

export const hue = {

  /**
   * GET request to hue.
   * @param  {String} [path] - Relative URL path.
   * @return {Promise<Object>} - HTTP response.
   */
  get: async (path) => {
    const url = huerl(path);

    const response = await fetch(url);
    return response.json();
  },

  /**
   * PUT request to hue.
   * @param  {String} [path] - Relative URL path.
   * @param  {Object} patch - JSON data.
   * @return {Promise<Object>} - HTTP response.
   */
  put: async (path, patch) => {
    const url = huerl(path);

    const response = await fetch(url, {
      body: JSON.stringify(patch),
      method: 'PUT',
    });

    return response.json();
  },

  /**
   * POST request to hue.
   * @param  {String} [path] - Relative URL path.
   * @param  {Object} data - JSON data.
   * @return {Promise<Object>} - HTTP response.
   */
  post: async (path, data) => {
    const url = huerl(path);

    const response = await fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
    });

    return response.json();
  },
};
