/* eslint-disable require-jsdoc */
class Light {
  constructor (light) {
    const { name, type } = light;

    Object.assign(this, { type, name }, {
      manufacturer: light.manufacturername,
      reachable: light.state.reachable,
      version: light.swversion,
      model: light.modelid,
      on: light.state.on,
    });
  }
}

export default async (args, context) => (
  new Light(await context.hue.get(`lights/${args.id}`))
);
