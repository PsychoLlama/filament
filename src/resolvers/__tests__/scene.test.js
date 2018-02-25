import { bridge, query, createScene, createLight } from '../../test-utils';

describe('Scene resolver', () => {
  let scene, endpoint;

  beforeEach(() => {
    scene = createScene();
    endpoint = bridge.get('/scenes/KseUksCEskA9Al2').reply(200, scene);
  });

  afterEach(() => {
    endpoint.done();
  });

  it('works', async () => {
    const result = await query`{
      scene(id: "KseUksCEskA9Al2") {
        name id
      }
    }`;

    expect(result.scene).toEqual({
      id: 'KseUksCEskA9Al2',
      name: scene.name,
    });
  });

  it('resolves light data when requested', async () => {
    const endpoint = bridge.get('/lights').reply(200, {
      41: createLight(),
      42: createLight(),
    });

    const result = await query`{
      scene(id: "KseUksCEskA9Al2") {
        lights { id name }
      }
    }`;

    expect(result.scene.lights).toEqual([
      { id: '41', name: 'Light name' },
      { id: '42', name: 'Light name' },
    ]);

    endpoint.done();
  });
});
