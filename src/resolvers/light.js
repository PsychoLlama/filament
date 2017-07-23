/* eslint-disable require-jsdoc */
class Light {
  constructor (light, id) {
    const { name, type } = light;

    Object.assign(this, { type, name, id }, {
      manufacturer: light.manufacturername,
      reachable: light.state.reachable,
      uniqueId: light.uniqueid,
      version: light.swversion,
      model: light.modelid,
      on: light.state.on,
    });
  }
}

export default async (args, context) => (
  new Light(await context.hue.get(`lights/${args.id}`), args.id)
);
