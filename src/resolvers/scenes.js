import { Scene } from './scene';

export default async (args, context) => {
  const response = await context.hue.get('scenes');

  return Object.keys(response).map(id => new Scene(id, response[id]));
};
