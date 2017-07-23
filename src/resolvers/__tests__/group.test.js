import { query, bridge, createGroup } from '../../test-utils';

jest.mock('../../../bridge.json');
jest.unmock('node-fetch');

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
});
