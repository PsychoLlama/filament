import { query, bridge, createLight } from '../../test-utils';

describe.skip('query { lights }', () => {
  let endpoint;

  beforeEach(() => {
    endpoint = bridge.get('/lights').reply(200, {
      1: createLight(),
      2: createLight(),
      3: createLight(),
    });
  });

  afterEach(() => {
    endpoint.done();
  });

  it('returns all lights', async () => {
    const response = await query`{
      lights { name }
    }`;

    expect(response.errors).toBeFalsy();
    expect(response.data.lights).toEqual(expect.any(Array));
    expect(response.data.lights.length).toBe(3);
  });

  it('contains each light ID', async () => {
    const response = await query`{
      lights { id }
    }`;

    expect(response.errors).toBeFalsy();
    expect(response.data.lights[0]).toEqual({ id: 1 });
  });

  it('contains all the light data', async () => {
    const response = await query`{
      lights {
        name uniqueid type manufacturername swversion modelid
      }
    }`;

    expect(response.errors).toBeFalsy();
    expect(response.data.lights[0]).toEqual({
      uniqueid: '75:45:12:38:00:fa:0c:26-1b',
      type: 'Extended color light',
      manufacturername: 'Philips',
      swversion: '5.23.1.13452',
      name: 'Light name',
      modelid: 'LCT001',
    });
  });

  describe('state', () => {
    it('contains the state', async () => {
      const response = await query`{
        lights {
          state { on hue sat bri effect xy ct alert colormode reachable }
        }
      }`;

      expect(response.errors).toBeFalsy();
      expect(response.data.lights[0].state).toEqual({
        xy: [0.3144, 0.3301],
        reachable: true,
        colormode: 'xy',
        effect: 'none',
        alert: 'none',
        hue: 34076,
        sat: 251,
        bri: 254,
        on: true,
        ct: 153,
      });
    });
  });
});
