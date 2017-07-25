import Color from 'hue-colors';

import { query, bridge, createGroup } from '../../test-utils';

jest.mock('../../../bridge.json');

describe('Group state mutation', () => {
  let get, put, group, spy;

  beforeEach(() => {
    group = createGroup({ id: 28 });
    spy = jest.fn(() => ({ fake: true }));

    get = bridge.get('/groups/28').reply(200, group);
    put = bridge.put('/groups/28/action').reply(200, spy);
  });

  afterEach(() => {
    get.done();
    put.done();
  });

  it('sets the group state', async () => {
    const { hue } = await query`mutation {
      hue {
        group: setGroupState(id: 28 state: { on: true }) { allOn }
      }
    }`;

    expect(hue.group).toEqual({ allOn: group.state.all_on });
    expect(spy).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify({
        on: true,
      }),
    );
  });

  it('sets the transition time', async () => {
    await query`mutation {
      hue {
        setGroupState(id: 28 state: { transition: 1000, on: true }) { anyOn }
      }
    }`;

    expect(spy).toHaveBeenCalled();
    const [, json] = spy.mock.calls[0];

    expect(JSON.parse(json)).toEqual({
      transitiontime: 10,
      on: true,
    });
  });

  it('supports color mutations', async () => {
    await query`mutation {
      hue {
        setGroupState(id: 28 state: { color: "#0000ff" }) { color }
      }
    }`;

    const [, json] = spy.mock.calls[0];
    const [hue, sat, bri] = Color.fromHex('#0000ff').toHsb();

    expect(JSON.parse(json)).toEqual({ hue, sat, bri });
  });
});
