import { query, bridge, createGroup } from '../../test-setup/utils';

describe('query { groups }', () => {
  let endpoint;

  beforeEach(() => {
    endpoint = bridge.get('/groups').reply(200, {
      1: createGroup(),
      2: createGroup(),
      3: createGroup(),
    });
  });

  afterEach(() => {
    endpoint.done();
  });

  it('returns an array', async () => {
    const response = await query`{
      groups { name id }
    }`;

    expect(response.errors).toBeFalsy();
    expect(response.data.groups).toEqual([
      { name: 'Group name', id: 1 },
      { name: 'Group name', id: 2 },
      { name: 'Group name', id: 3 },
    ]);
  });

  it('returns group action metadata', async () => {
    const response = await query`{
      groups {
        action { alert colormode effect xy hue sat bri on ct }
      }
    }`;

    expect(response.errors).toBeFalsy();
    expect(response.data.groups[0].action).toEqual({
      alert: 'select',
      colormode: 'ct',
      effect: 'none',
      xy: [0.5, 0.5],
      hue: 10000,
      sat: 254,
      bri: 254,
      on: true,
      ct: 250,
    });
  });

  it('returns group state', async () => {
    const response = await query`{
      groups {
        state { allOn anyOn }
      }
    }`;

    expect(response.errors).toBeFalsy();
    expect(response.data.groups[0].state).toEqual({
      allOn: false,
      anyOn: true,
    });
  });
});
