import mutation from '../utils/state-mutations';
import group from './group';

export default async (args, context) => {
  const patch = mutation(args.state);

  // Pull the lever, Kronk!
  await context.hue.put(`groups/${args.id}/action`, patch);

  return group({ id: args.id }, context);
};
