import { Light } from './light';

export default async (args, context) => {
  const lights = await context.hue.get('lights');

  return Object.keys(lights).map(id => {
    const light = lights[id];

    return new Light(light, id);
  });
};
