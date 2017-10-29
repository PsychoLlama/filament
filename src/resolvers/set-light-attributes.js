import mutation from '../utils/light-attributes-mutation';
import light from './light';

export default async (args, context) => {
  const patch = mutation(args.attributes);

  await context.hue.put(`lights/${args.id}`, patch);

  return light({ id: args.id }, context);
};
