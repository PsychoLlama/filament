import tinycolor from 'tinycolor2';
import HueColor from 'hue-colors';

export default mutation => {
  const { transition, color, ...patch } = mutation;

  // Transitions are multiples of 100ms.
  if (typeof transition === 'number') {
    patch.transitiontime = transition / 100;
  }

  // Turn hex codes into hue-friendly HSB.
  if (typeof color === 'string') {
    const hex = tinycolor(color).toHex();
    const [hue = 0, sat, bri] = HueColor.fromHex(hex).toHsb();
    Object.assign(patch, { hue, sat, bri });
  }

  return patch;
};
