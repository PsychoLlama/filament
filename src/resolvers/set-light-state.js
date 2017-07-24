import mutation from '../utils/state-mutations';
import light from './light';

export default async (args, context) => {
  const patch = mutation(args.state);

  await context.hue.put(`lights/${args.id}/state`, patch);

  return light({ id: args.id }, context);
};
