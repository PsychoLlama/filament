import { query, bridge, createGroup, createLight } from '../../test-utils';
import toHexColorCode, { colorTypes } from '../../utils/color';

jest.mock('../../../bridge.json');

describe('Group resolver', () => {
  let endpoint;

  afterEach(() => endpoint.done());

  it('returns a group', async () => {
    const group = createGroup();
    endpoint = bridge.get('/groups/5').reply(200, group);

    const result = await query`{
      group(id: 5) { name }
    }`;

    expect(result).toEqual({
      group: { name: group.name },
    });
  });

  it('returns the correct data', async () => {
    const group = createGroup();
    endpoint = bridge.get('/groups/10').reply(200, group);

    const result = await query`{
      group(id: 10) {
        name type class anyOn allOn id
      }
    }`;

    expect(result).toMatchSnapshot();
  });

  it('resolves every light beneath', async () => {
    const group = createGroup({ lights: [1] });
    const light = createLight();
    endpoint = bridge.get('/groups/15').reply(200, group);
    const lightEndpoint = bridge.get('/lights').reply(200, { 1: light });

    const result = await query`{
      group(id: 15) {
        lights { name id }
      }
    }`;

    expect(result.group).toEqual({
      lights: [{ name: light.name, id: '1' }],
    });

    lightEndpoint.done();
  });

  describe('color', () => {
    it('returns black if the group is powered off', async () => {
      const group = createGroup();
      group.state.any_on = false; // eslint-disable-line

      endpoint = bridge.get('/groups/25').reply(200, group);

      const result = await query`{
        group(id: 25) { color }
      }`;

      expect(result.group.color).toBe('#000000');
    });

    it('returns a hex code', async () => {
      const group = createGroup();
      group.state.colormode = colorTypes.HSB;
      group.state.hue = 64000;
      group.state.sat = 200;
      group.state.bri = 150;

      endpoint = bridge.get('/groups/25').reply(200, group);

      const result = await query`{
        group(id: 25) { color }
      }`;

      expect(result.group.color).toBe(toHexColorCode(group.action));
    });

    it('understands temperature colors', async () => {
      const group = createGroup();
      group.state.colormode = colorTypes.TEMP;
      group.state.bri = 100;
      group.state.ct = 215;

      endpoint = bridge.get('/groups/30').reply(200, group);

      const result = await query`{
        group(id: 30) { color }
      }`;

      expect(result.group.color).toBe(toHexColorCode(group.action));
    });

    it('understands XY colorspace', async () => {
      const group = createGroup();
      group.state.colormode = colorTypes.XY;
      group.state.xy = [0.234, 0.567];

      endpoint = bridge.get('/groups/35').reply(200, group);

      const result = await query`{
        group(id: 35) { color }
      }`;

      expect(result.group.color).toBe(toHexColorCode(group.action));
    });
  });
});
