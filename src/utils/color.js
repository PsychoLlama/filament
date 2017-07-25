import invariant from 'invariant';
import Color from 'hue-colors';

// Used when a light or a group of lights is powered off.
export const BLACK = '#000000';

// Represents the type of color encoding last used.
export const colorTypes = {
  TEMP: 'ct',
  HSB: 'hs',
  XY: 'xy',
};

// A map of color encodings to their hex code converters.
export const colorExtractors = {
  // Hue, saturation, brightness.
  [colorTypes.HSB]: ({ hue, sat, bri }) => {
    invariant(typeof hue === 'number', 'Missing hue value');
    invariant(typeof sat === 'number', 'Missing saturation value');
    invariant(typeof bri === 'number', 'Missing brightness value');

    return Color.fromHsb(hue, sat, bri);
  },

  // XY color coordinates.
  [colorTypes.XY]: ({ xy, bri }) => {
    invariant(typeof bri === 'number', 'Missing brightness value');
    invariant(Array.isArray(xy), 'Missing XY value');

    return Color.fromCIE(xy[0], xy[1], bri);
  },

  // Color temperature (orange-ish to white).
  [colorTypes.TEMP]: ({ ct, bri }) => {
    invariant(typeof bri === 'number', 'Missing brightness value');
    invariant(typeof ct === 'number', 'Missing temperature value');

    return Color.fromCt(ct, bri);
  },
};

/**
 * Takes light state and turns it into a CSS color code.
 * @param  {Object} state - State of a light or group of lights.
 * @param  {String} state.colormode - Either `xy`, `hs`, or `ct`.
 * @param  {Number} [state.hue] - Number between 0-0xffff.
 * @param  {Number} [state.sat] - Saturation.
 * @param  {Number} [state.ct] - Color temperature.
 * @param  {Array<Number>} [state.xy] - XY color space coordinates.
 * @param  {Number} state.bri - Brightness.
 * @return {String} - CSS hex color code, hash character and all.
 */
export default state => {
  // Default to HSB just in case Philips adds another color mode.
  const extractor =
    colorExtractors[state.colormode] || colorExtractors[colorTypes.HSB];

  // Bless you, hue-colors. Bless you.
  const hexColorCode = extractor(state).toHex();

  return `#${hexColorCode}`;
};
