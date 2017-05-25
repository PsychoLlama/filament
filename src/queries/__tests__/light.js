import { query, bridge, createLight } from '../../test-setup/utils';

describe('query { light }', () => {
  let endpoint;

  beforeEach(() => {
    endpoint = bridge
      .get('/lights/1')
      .reply(200, createLight());
  });

  afterEach(() => {
    endpoint.done();
  });

  it('returns a light', async () => {
    const response = await query`{
      light(id: 1) { name id }
    }`;

    expect(response.errors).toBeFalsy();
    expect(response.data.light).toEqual({
      name: 'Light name',
      id: 1,
    });
  });
});
