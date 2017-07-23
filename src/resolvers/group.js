/* eslint-disable require-jsdoc */
import resolveLight from './light';

class LightGroup {
  constructor (group) {
    const { recycle, name, type } = group;

    Object.assign(this, { recycle, name, type }, {
      allOn: group.state.all_on,
      anyOn: group.state.any_on,
      class: group.class,
    });

    this.raw = group;
  }

  async lights (args, context) {
    const requests = this.raw.lights.map((id) => (
      resolveLight({ id }, context)
    ));

    return Promise.all(requests);
  }
}

export default async (args, context) => {
  const group = await context.hue.get(`groups/${args.id}`);

  return new LightGroup(group);
};
