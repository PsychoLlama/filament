import get from 'node-fetch';

import bridge from '../../bridge.json';

export const url = (path = '') => (
  `http://${bridge.ip}/api/${bridge.token}/${path}`
);

export const fetch = (path, options) => get(url(path), options);
export const put = (path, body) => fetch(path, {
  body: JSON.stringify(body),
  method: 'PUT',
});
