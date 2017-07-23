/* eslint-disable require-jsdoc */
import Color from 'hue-colors';

// Represents the type of color encoding last used.
export const colorTypes = {
  TEMP: 'ct',
  HSB: 'hs',
  XY: 'xy',
};

const colorExtractors = {
  [colorTypes.HSB]: ({ hue, sat, bri }) => Color.fromHsb(hue, sat, bri),
  [colorTypes.XY]: ({ xy, bri }) => Color.fromCIE(xy[0], xy[1], bri),
  [colorTypes.TEMP]: ({ ct, bri }) => Color.fromCt(ct, bri),
};

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
    const { colormode, on } = this.raw.state;

    if (!on) {
      return '#000000';
    }

    const colorExtractor = colorExtractors[colormode] ||
      colorExtractors[colorTypes.HSB];

    const color = colorExtractor(this.raw.state);

    return `#${color.toHex()}`;
  }
}

export default async (args, context) => (
  new Light(await context.hue.get(`lights/${args.id}`), args.id)
);
