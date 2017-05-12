import { query } from '../../test-setup/utils';

describe('query { light }', () => {
  it('returns a light', async () => {
    const response = await query`{
      light(id: 1) { name id }
    }`;

    expect(response.errors).toBeFalsy();
    expect(response.data.light).toEqual({
      name: 'Light name',
      id: 1,
    });
  });
});
