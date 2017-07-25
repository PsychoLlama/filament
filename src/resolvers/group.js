/* eslint-disable require-jsdoc */
import toHexColorCode, { BLACK } from '../utils/color';
import resolveLight from './light';

export class LightGroup {
  constructor(group, id) {
    const { recycle, name, type } = group;

    Object.assign(
      this,
      { recycle, name, type, id },
      {
        allOn: group.state.all_on,
        anyOn: group.state.any_on,
        class: group.class,
      },
    );

    this.raw = group;
  }

  async lights(args, context) {
    const requests = this.raw.lights.map(id => resolveLight({ id }, context));

    return Promise.all(requests);
  }

  color() {
    return this.anyOn ? toHexColorCode(this.raw.action) : BLACK;
  }
}

export default async (args, context) => {
  const group = await context.hue.get(`groups/${args.id}`);

  return new LightGroup(group, args.id);
};
