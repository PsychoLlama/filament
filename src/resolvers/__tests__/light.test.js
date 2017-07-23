import { bridge, query, createLight } from '../../test-utils';
import toHexColorCode, { colorTypes, BLACK } from '../../utils/color';

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
          name manufacturer version model type on reachable id uniqueId
        }
      }
    }`;

    expect(data.hue.light).toEqual(expect.objectContaining({
      manufacturer: light.manufacturername,
      reachable: light.state.reachable,
      uniqueId: light.uniqueid,
      version: light.swversion,
      model: light.modelid,
      on: light.state.on,
      type: light.type,
      id: '35',
    }));
  });

  describe('color', () => {
    it('returns black if the light is off', async () => {
      const light = createLight();
      light.state.on = false;

      endpoint = bridge.get('/lights/25').reply(200, light);

      const { hue } = await query`{
        hue {
          light(id: 25) { color }
        }
      }`;

      expect(hue.light.color).toBe(BLACK);
    });

    it('returns a hex code', async () => {
      const light = createLight();
      light.state.colormode = colorTypes.HSB;
      light.state.hue = 64000;
      light.state.sat = 200;
      light.state.bri = 150;

      endpoint = bridge.get('/lights/25').reply(200, light);

      const { hue } = await query`{
        hue {
          light(id: 25) { color }
        }
      }`;

      expect(hue.light.color).toBe(toHexColorCode(light.state));
    });

    it('understands temperature colors', async () => {
      const light = createLight();
      light.state.colormode = colorTypes.TEMP;
      light.state.bri = 100;
      light.state.ct = 215;

      endpoint = bridge.get('/lights/30').reply(200, light);

      const { hue } = await query`{
        hue {
          light(id: 30) { color }
        }
      }`;

      expect(hue.light.color).toBe(toHexColorCode(light.state));
    });

    it('understands XY colorspace', async () => {
      const light = createLight();
      light.state.colormode = colorTypes.XY;
      light.state.xy = [0.234, 0.567];

      endpoint = bridge.get('/lights/35').reply(200, light);

      const { hue } = await query`{
        hue {
          light(id: 35) { color }
        }
      }`;

      expect(hue.light.color).toBe(toHexColorCode(light.state));
    });
  });
});
