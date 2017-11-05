import { Schedule } from './schedule';

export default async (args, context) => {
  const schedules = await context.hue.get('schedules');

  return Object.keys(schedules).map(id => new Schedule(id, schedules[id]));
};
