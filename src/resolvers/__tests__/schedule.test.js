import { query, bridge, createSchedule } from '../../test-utils';

describe('Schedule resolver', () => {
  let endpoint, schedule;

  beforeEach(() => {
    schedule = createSchedule();
    endpoint = bridge.get('/schedules/8').reply(200, schedule);
  });

  afterEach(() => endpoint.done());

  it('works', async () => {
    const result = await query`{
      schedule(id: "8") {
        name
      }
    }`;

    expect(result.schedule).not.toBe(null);
  });

  it('includes the ID', async () => {
    const result = await query`{
      schedule(id: "8") {
        name id
      }
    }`;

    expect(result.schedule).toEqual({
      name: schedule.name,
      id: '8',
    });
  });
});
