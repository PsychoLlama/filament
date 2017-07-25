import { LightGroup } from './group';

export default async (args, context) => {
  const groups = await context.hue.get('groups');

  return Object.keys(groups).map(id => {
    const group = groups[id];

    return new LightGroup(group, id);
  });
};
