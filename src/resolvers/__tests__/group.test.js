import { query, bridge, createGroup, createLight } from '../../test-utils';

jest.mock('../../../bridge.json');

describe('Group resolver', () => {
  let endpoint;

  afterEach(() => endpoint.done());

  it('returns a group', async () => {
    const group = createGroup();
    endpoint = bridge.get('/groups/5').reply(200, group);

    const result = await query`{
      hue { group(id: 5) { name } }
    }`;

    expect(result).toEqual({
      hue: {
        group: { name: group.name },
      },
    });
  });

  it('returns the correct data', async () => {
    const group = createGroup();
    endpoint = bridge.get('/groups/10').reply(200, group);

    const result = await query`{
      hue {
        group(id: 10) {
          name type class anyOn allOn
        }
      }
    }`;

    expect(result).toMatchSnapshot();
  });

  it('resolves every light beneath', async () => {
    const group = createGroup({ lights: [1] });
    const light = createLight();
    endpoint = bridge.get('/groups/15').reply(200, group);
    const lightEndpoint = bridge.get('/lights/1').reply(200, light);

    const result = await query`{
      hue {
        group(id: 15) {
          lights { name id }
        }
      }
    }`;

    expect(result.hue.group).toEqual({
      lights: [{ name: light.name, id: '1' }],
    });

    lightEndpoint.done();
  });
});
