/* eslint-disable require-jsdoc */
import resolveLight from './light';

class LightGroup {
  constructor (group) {
    this.raw = group;

    this.recycle = group.recycle;
    this.class = group.class;
    this.name = group.name;
    this.type = group.type;
    this.anyOn = group.state.any_on;
    this.allOn = group.state.all_on;
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
