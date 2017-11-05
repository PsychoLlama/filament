import { query, bridge, createScenes } from '../../test-utils';

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
          id name owner locked version recycle lastUpdated picture
        }
      }
    }`;

    const [id] = Object.keys(scenes);
    const { name, owner, recycle, locked, version, picture } = scenes[id];
    expect(result.hue.scenes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          lastUpdated: scenes[id].lastupdated,
          picture,
          recycle,
          version,
          locked,
          owner,
          name,
        }),
      ]),
    );
  });
});
