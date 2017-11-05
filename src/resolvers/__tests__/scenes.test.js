import { query, bridge, createScenes, createLight } from '../../test-utils';

describe('Scenes resolver', () => {
  let scenes, endpoint;

  beforeEach(() => {
    scenes = createScenes();
    endpoint = bridge.get('/scenes').reply(200, scenes);
  });

  afterEach(() => {
    endpoint.done();
  });

  it('works', async () => {
    const result = await query`{
      hue {
        scenes {
          id
        }
      }
    }`;

    expect(result.hue.scenes).toEqual(expect.any(Array));
    expect(result.hue.scenes.length).toBeGreaterThan(0);
  });

  it('contains each scene ID', async () => {
    const result = await query`{
      hue {
        scenes {
          id
        }
      }
    }`;

    const [id] = Object.keys(scenes);
    expect(result.hue.scenes).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: id })]),
    );
  });

  it('formats all the data', async () => {
    const result = await query`{
      hue {
        scenes {
          id name owner locked version recycle lastUpdated
        }
      }
    }`;

    const [id] = Object.keys(scenes);
    const { name, owner, recycle, locked, version } = scenes[id];
    expect(result.hue.scenes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          lastUpdated: scenes[id].lastupdated,
          recycle,
          version,
          locked,
          owner,
          name,
        }),
      ]),
    );
  });

  it('resolves light data when requested', async () => {
    const endpoints = [
      bridge.get('/lights/41').reply(200, createLight()),
      bridge.get('/lights/42').reply(200, createLight()),
    ];

    const result = await query`{
      hue {
        scenes {
          lights { id name }
        }
      }
    }`;

    expect(result.hue.scenes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          lights: [
            { id: '41', name: 'Light name' },
            { id: '42', name: 'Light name' },
          ],
        }),
      ]),
    );

    endpoints.forEach(endpoint => endpoint.done());
  });
});
