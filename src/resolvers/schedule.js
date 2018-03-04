/** Hue scheduled action (e.g., alarms). */
export class Schedule {
  /**
   * @param  {String} id - Schedule ID.
   * @param  {Object} schedule - Data returned from the REST API.
   */
  constructor(id, { localtime, ...schedule }) {
    const command = {
      ...schedule.command,
      body: JSON.stringify(schedule.command.body),
    };

    Object.assign(this, schedule, { localTime: localtime, command, id });
  }
}

export default async (args, context) => {
  const schedule = await context.hue.get(`schedules/${args.id}`);

  return new Schedule(args.id, schedule);
};
