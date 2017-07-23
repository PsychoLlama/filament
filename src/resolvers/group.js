/**
 * Resolves a collection of groups.
 * @class
 */
class LightGroup {

  /**
   * @param  {Object} group - All the group data.
   */
  constructor (group) {
    this._data = group;

    this.recycle = group.recycle;
    this.class = group.class;
    this.name = group.name;
    this.type = group.type;
    this.anyOn = group.state.any_on;
    this.allOn = group.state.all_on;
  }
}

export default async (args, context) => {
  const group = await context.hue.get(`groups/${args.id}`);

  return new LightGroup(group);
};
