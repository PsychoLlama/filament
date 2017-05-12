import { query, bridge } from '../../test-setup/utils';

describe('mutation { group }', () => {
  let endpoint;
  const setup = () => bridge.put('/groups/5/action').reply(200, [
    { success: { '/groups/5/action/on': true } },
  ]);

  it('sets the group state', async () => {
    endpoint = setup();

    const response = await query`mutation {
      group(id: 5, state: {
        on: false,
      })
    }`;

    expect(response.errors).toBeFalsy();
    endpoint.done();
  });

  it('fails if the endpoint fails', async () => {
    endpoint = bridge.put('/groups/5/action')
      .reply(500, 'Internal server potato.');

    const response = await query`mutation {
      group(id: 5, state: {
        on: true,
      })
    }`;

    expect(response.errors).toBeTruthy();
    endpoint.done();
  });
});
