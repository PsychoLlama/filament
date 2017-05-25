import { query, createGroup, bridge } from '../../test-setup/utils';

bridge.get('/groups/2').times(3).reply(200, createGroup());

describe('query { group }', () => {
  it('returns the correct group', async () => {
    const response = await query`{
      group(id: 2) {
        name id
      }
    }`;

    expect(response.errors).toBeFalsy();
    expect(response.data.group).toEqual({
      name: 'Group name',
      id: 2,
    });
  });

  it('returns group state', async () => {
    const response = await query`{
      group(id: 2) {
        state { all_on any_on }
      }
    }`;

    expect(response.errors).toBeFalsy();
    expect(response.data.group.state).toEqual({
      'all_on': false,
      'any_on': true,
    });
  });

  it('returns all the group fields', async () => {
    const response = await query`{
      group(id: 2) {
        lights type recycle class id
      }
    }`;

    expect(response.errors).toBeFalsy();
    expect(response.data.group).toEqual({
      class: 'Hallway',
      lights: [1, 2],
      recycle: true,
      type: 'Room',
      id: 2,
    });
  });
});
