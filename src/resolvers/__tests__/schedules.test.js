import { query, bridge, createSchedules } from '../../test-utils';

describe('Schedules resolver', () => {
  let endpoint, schedules;

  beforeEach(() => {
    schedules = createSchedules();
    endpoint = bridge.get('/schedules').reply(200, schedules);
  });

  afterEach(() => endpoint.done());

  it('works', async () => {
    const { schedules } = await query`{
      schedules {
        name
      }
    }`;

    expect(schedules).toEqual(expect.any(Array));
    expect(schedules).toHaveLength(Object.keys(schedules).length);
  });

  it('includes the ID', async () => {
    const result = await query`{
      schedules {
        id
      }
    }`;

    const expected = Object.keys(schedules).map((id) =>
      expect.objectContaining({ id }),
    );

    expect(result.schedules).toEqual(expect.arrayContaining(expected));
  });

  it('formats the data correctly', async () => {
    const result = await query`{
      schedules {
        localTime name time description recycle status created
      }
    }`;

    const [id] = Object.keys(schedules);
    const {
      localtime,
      name,
      time,
      description,
      recycle,
      status,
      created,
    } = schedules[id];

    expect(result.schedules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          localTime: localtime,
          description,
          created,
          recycle,
          status,
          name,
          time,
        }),
      ]),
    );
  });
});
