import get from 'node-fetch';

import bridge from '../../bridge.json';

export const url = (path = '') => (
  `http://${bridge.ip}/api/${bridge.token}/${path}`
);

export const fetch = (path) => get(url(path));
