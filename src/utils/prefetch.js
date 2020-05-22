/**
 * Fetches all lights from the bridge and primes the
 * dataloader cache, making bulk light requests more efficient.
 * @param  {Object} context - The GQL context.
 * @return {Promise<void>} - Resolves when finished.
 */
export const prefetchLights = async (context) => {
  const lights = await context.hue.get('lights');

  for (const [id, light] of Object.entries(lights)) {
    const url = `lights/${id}`;
    context.hue.precache(url, light);
  }
};
