import { query, bridge, createGroup } from '../../test-utils';

jest.mock('../../../bridge.json');

describe('Group attributes mutation', () => {
  let get, put, spy, group;

  beforeEach(() => {
    group = createGroup({ name: 'foo' });
    spy = jest.fn(() => ({ fake: true }));

    put = bridge.put('/groups/10').reply(200, spy);
    get = bridge.get('/groups/10').reply(200, group);
  });

  afterEach(() => {
    get.done();
    put.done();
  });

  it('sets the group attributes', async () => {
    await query`mutation {
      setGroupAttributes(id: 10 attributes: { name: "bar" }) { name }
    }`;

    expect(spy).toHaveBeenCalled();
    const [, json] = spy.mock.calls[0];

    expect(JSON.parse(json)).toEqual({ name: 'bar' });
  });
});
