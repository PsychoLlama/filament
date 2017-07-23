/* eslint-disable require-jsdoc */
import toHexColorCode, { BLACK } from '../utils/color';

class Light {
  constructor (light, id) {
    this.raw = light;
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

  /**
   * Turns the hue color system into a (relatively) friendly hex code.
   * @return {String} - A CSS hex color code.
   */
  color () {
    return this.on ? toHexColorCode(this.raw.state) : BLACK;
  }
}

export default async (args, context) => (
  new Light(await context.hue.get(`lights/${args.id}`), args.id)
);
