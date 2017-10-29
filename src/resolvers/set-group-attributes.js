import mutation from '../utils/group-attributes-mutation';
import group from './group';

export default async (args, context) => {
  const patch = mutation(args.attributes);

  await context.hue.put(`groups/${args.id}`, patch);

  return group({ id: args.id }, context);
};
