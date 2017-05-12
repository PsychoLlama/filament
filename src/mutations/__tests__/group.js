import { query } from '../../test-setup/utils';

describe('mutation { group }', () => {
  it('sets the group state', async () => {
    const response = await query`mutation {
      group(id: 5, state: {
        on: false,
      })
    }`;

    expect(response.errors).toBeFalsy();
  });

  it('fails if the endpoint fails', async () => {
    const response = await query`mutation {
      group(id: 5, state: {
        on: true,
      })
    }`;

    expect(response.errors).toBeTruthy();
  });
});
