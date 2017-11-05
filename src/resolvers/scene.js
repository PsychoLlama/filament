import resolveLight from './light';

/** Represents a Hue scene */
export class Scene {
  /**
   * @param  {String} id - Scene ID.
   * @param  {Object} data - Scene data.
   */
  constructor(id, { lights, lastupdated, ...scene }) {
    this._lights = lights;

    Object.assign(this, { id, lastUpdated: lastupdated, ...scene });
  }

  /**
   * Fetches the full data of each light.
   * @param  {Object} args - None accepted.
   * @param  {Object} context - Request context.
   * @param  {Object} info - GraphQL AST request info.
   * @return {Promise[]} - The request for each light.
   */
  lights(args, context, info) {
    return this._lights.map(id => resolveLight({ id }, context, info));
  }
}

export default async (args, context) => {
  const scene = await context.hue.get(`scenes/${args.id}`);

  return new Scene(args.id, scene);
};
