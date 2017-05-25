import { query, bridge } from '../../test-setup/utils';

describe('mutation { light }', () => {
  const success = [{ '/lights/5/state/on': true }];
  const setup = () => bridge.put('/lights/5/state').reply(200, success);

  it('issues a put request', async () => {
    const endpoint = setup();
    const response = await query`mutation {
      light(id: 5, on: true)
    }`;

    expect(response.errors).toBeFalsy();
    endpoint.done();
  });

  it('sets the light state', async () => {
    const endpoint = bridge.put('/lights/10/state').reply(200, (url, data) => {
      const action = JSON.parse(data);
      expect(action).toEqual({ on: false });

      return success;
    });

    const response = await query`mutation {
      light(id: 10, on: false)
    }`;

    expect(response.errors).toBeFalsy();
    endpoint.done();
  });

  it('rejects if any of the actions fail', async () => {
    const endpoint = bridge.put('/lights/15/state')
      .reply(500, [{
        error: {
          type: 7,
          address: '/groups/15',
          description: '#YOLO',
        },
      }]);

    const response = await query`mutation {
      light(id: 15, on: true)
    }`;

    expect(response.errors).toBeTruthy();
    endpoint.done();
  });
});
