import { query, bridge, createLight } from '../../test-utils';

jest.mock('../../../bridge.json');

describe('Light attributes mutation', () => {
  let get, put, spy, light;

  beforeEach(() => {
    light = createLight({ on: true });
    spy = jest.fn(() => ({ fake: true }));

    put = bridge.put('/lights/10').reply(200, spy);
    get = bridge.get('/lights/10').reply(200, light);
  });

  afterEach(() => {
    get.done();
    put.done();
  });

  it('sets the light attributes', async () => {
    await query`mutation {
      hue {
        setLightAttributes(id: 10 attributes: { name: "foo" }) { name }
      }
    }`;

    expect(spy).toHaveBeenCalled();
    const [, json] = spy.mock.calls[0];

    expect(JSON.parse(json)).toEqual({ name: 'foo' });
  });
});
