/** Hue scheduled action (e.g., alarms). */
export class Schedule {
  /**
   * @param  {String} id - Schedule ID.
   * @param  {Object} schedule - Data returned from the REST API.
   */
  constructor(id, { localtime, ...schedule }) {
    Object.assign(this, schedule, { id, localTime: localtime });
  }
}

export default async (args, context) => {
  const schedule = await context.hue.get(`schedules/${args.id}`);

  return new Schedule(args.id, schedule);
};
