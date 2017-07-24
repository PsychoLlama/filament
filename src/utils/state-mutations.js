import invariant from 'invariant';
import Color from 'hue-colors';

const hexValidator = /^#[0-9a-f]{6}$/i;

const normalizeHexColor = (color) => {
  const hex = color.toLowerCase();

  invariant(hex[0] === '#', 'Invalid hex code, missing the hash symbol (#)');
  invariant(hex.length === 7, `Hex code length is invalid (${hex.length - 1})`);
  invariant(hexValidator.test(hex), `Invalid characters in hex code (${hex})`);

  return hex.slice(1);
};

export default (mutation) => {
  const { transition, color, ...patch } = mutation;

  // Transitions are multiples of 100ms.
  if (typeof transition === 'number') {
    patch.transitiontime = transition / 100;
  }

  // Turn hex codes into hue-friendly HSB.
  if (typeof color === 'string') {
    const hex = normalizeHexColor(color);
    const [hue = 0, sat, bri] = Color.fromHex(hex).toHsb();
    Object.assign(patch, { hue, sat, bri });
  }

  return patch;
};
