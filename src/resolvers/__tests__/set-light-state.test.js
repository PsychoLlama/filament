import { query, bridge, createLight } from '../../test-utils';
import mutation from '../../utils/state-mutations';

jest.mock('../../../bridge.json');

describe('Light state mutation', () => {
  let get, put, spy, light;

  beforeEach(() => {
    light = createLight({ on: true });
    spy = jest.fn(() => ({ fake: true }));

    put = bridge.put('/lights/10/state').reply(200, spy);
    get = bridge.get('/lights/10').reply(200, light);
  });

  afterEach(() => {
    get.done();
    put.done();
  });

  it('sets the light state', async () => {
    await query`mutation {
      hue {
        setLightState(id: 10 state: { on: false }) { on }
      }
    }`;

    expect(spy).toHaveBeenCalled();
    const [, json] = spy.mock.calls[0];

    expect(JSON.parse(json)).toEqual({ on: false });
  });

  it('supports transition time', async () => {
    await query`mutation {
      hue {
        setLightState(id: 10 state: { transition: 2000, on: true }) { on }
      }
    }`;

    const [, json] = spy.mock.calls[0];

    expect(JSON.parse(json)).toEqual({
      transitiontime: 20,
      on: true,
    });
  });

  it('supports colors', async () => {
    await query`mutation {
      hue {
        setLightState(id: 10 state: { on: true, color: "#00aaff" }) { on }
      }
    }`;

    const [, json] = spy.mock.calls[0];

    expect(JSON.parse(json)).toEqual({
      ...mutation({ color: '#00aaff' }),
      on: true,
    });
  });
});
