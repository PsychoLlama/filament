import invariant from 'invariant';
import Color from 'hue-colors';

import group from './group';

const hexCodeValidator = /[0-9a-fA-F]/;
const isValidHexCharacter = hexCodeValidator.test.bind(hexCodeValidator);

/**
 * Ensures a hex color code is valid.
 * @param  {String} color - CSS hex color code.
 * @throws {Error} - If any check fails.
 * @return {void}
 */
const validateColor = (color) => {
  invariant(color[0] === '#', 'Invalid hex code, expected a hash symbol.');
  invariant(color.length === 7, 'Expected a 6-digit hex color code.');

  const isValidHexCode = color.slice(1).split('').every(isValidHexCharacter);
  invariant(isValidHexCode, `Invalid color code: ${color}`);
};

export default async (args, context) => {
  const { transition, color, ...patch } = args.state;

  // Hue measures transition times in multiples of 100ms.
  if (transition) {
    patch.transitiontime = transition / 100;
  }

  // Turn hex codes into something Hue understands.
  if (color) {
    validateColor(color);
    const [hue, sat, bri] = Color.fromHex(color.toLowerCase()).toHsb();
    Object.assign(patch, { hue, sat, bri });
  }

  // Pull the lever, Kronk!
  await context.hue.put(`groups/${args.id}/action`, patch);

  return group({ id: args.id }, context);
};
