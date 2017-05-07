import { query } from '../../test-setup/utils';

describe('{ group }', () => {
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
});
