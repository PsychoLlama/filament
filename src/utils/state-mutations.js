import tinycolor from 'tinycolor2';
import HueColor from 'hue-colors';
import assert from 'assert';

// Sometimes results in negative numbers,
// and not always less than 0xffff.
const normalizeHue = (hue) => {
  const sum = hue < 0 ? 0xffff + hue : hue;

  return sum % 0xffff;
};

export default (mutation) => {
  const { transition, color, ...patch } = mutation;

  // Transitions are multiples of 100ms.
  if (typeof transition === 'number') {
    patch.transitiontime = transition / 100;
  }

  // Turn hex codes into hue-friendly HSB.
  if (typeof color === 'string') {
    const colorValue = tinycolor(color);
    assert(colorValue.isValid(), `Invalid color '${color}'`);

    const hex = colorValue.toHex();
    const [hue = 0, sat, bri] = HueColor.fromHex(hex).toHsb();

    Object.assign(patch, { sat, bri, hue: normalizeHue(hue) });
  }

  return patch;
};
