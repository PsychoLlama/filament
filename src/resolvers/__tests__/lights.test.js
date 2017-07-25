import { query, bridge, createLight } from '../../test-utils';

describe('Lights resolver', () => {
  let endpoint;
  const createLights = amount =>
    Array(amount)
      .fill()
      .map((stopThisMadness, id) => createLight({ id: id + 1 }))
      .reduce((lights, light) => {
        lights[light.id] = light;

        return lights;
      }, {});

  afterEach(() => endpoint.done());

  it('passes sanity checks', async () => {
    const lights = createLights(2);
    endpoint = bridge.get('/lights').reply(200, lights);

    const { hue } = await query`{
      hue {
        lights { name id }
      }
    }`;

    expect(hue.lights).toEqual([
      {
        id: String(lights[1].id),
        name: lights[1].name,
      },
      {
        id: String(lights[2].id),
        name: lights[2].name,
      },
    ]);
  });

  it('contains all the light data', async () => {
    const lights = createLights(1);
    endpoint = bridge.get('/lights').reply(200, lights);

    const { hue } = await query`{
      hue {
        lights { name id on color type uniqueId version model reachable }
      }
    }`;

    expect(hue.lights).toMatchSnapshot();
  });
});
