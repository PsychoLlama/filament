import { bridge, query, createLight } from '../../test-utils';

jest.unmock('node-fetch');

describe('Light resolver', () => {
  let endpoint;
  afterEach(() => endpoint.done());

  it('returns light data', async () => {
    const light = createLight();
    endpoint = bridge.get('/lights/30').reply(200, light);

    const data = await query`{
      hue { light(id: 30) { name } }
    }`;

    expect(data.hue.light).toEqual({ name: light.name });
  });

  it('formats the data correctly', async () => {
    const light = createLight();
    endpoint = bridge.get('/lights/35').reply(200, light);

    const data = await query`{
      hue {
        light(id: 35) {
          name manufacturer version model type on reachable
        }
      }
    }`;

    expect(data.hue.light).toEqual(expect.objectContaining({
      manufacturer: light.manufacturername,
      reachable: light.state.reachable,
      version: light.swversion,
      model: light.modelid,
      on: light.state.on,
      type: light.type,
    }));
  });
});
