import { query, bridge, createGroup } from '../../test-utils';

describe('Groups resolver', () => {
  let endpoint;
  afterEach(() => endpoint.done());

  const createGroups = (amount) =>
    Array(amount)
      .fill()
      .map((goAwayUndefined, id) => createGroup({ id: id + 1 }))
      .reduce((groups, group) => {
        groups[group.id] = group;

        return groups;
      }, {});

  it('contains basic info', async () => {
    const groups = createGroups(2);

    endpoint = bridge.get('/groups').reply(200, groups);

    const result = await query`{
      groups { name id }
    }`;

    expect(result.groups).toEqual([
      {
        id: String(groups[1].id),
        name: groups[1].name,
      },
      {
        id: String(groups[2].id),
        name: groups[2].name,
      },
    ]);
  });

  it('contains all the data from each group', async () => {
    const groups = createGroups(1);
    endpoint = bridge.get('/groups').reply(200, groups);

    const result = await query`{
      groups { color name anyOn type }
    }`;

    expect(result.groups).toMatchSnapshot();
  });
});
