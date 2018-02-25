import { createLight } from '../../test-utils';
import { prefetchLights } from '../prefetch';

describe('prefetchLights', () => {
  let context;

  beforeEach(() => {
    context = {
      hue: {
        get: jest.fn(() => ({})),
        precache: jest.fn(),
      },
    };
  });

  it('requests all lights', async () => {
    await prefetchLights(context);

    expect(context.hue.get).toHaveBeenCalledWith('lights');
  });

  it('precaches every light', async () => {
    const lights = Array(10)
      .fill()
      .map(() => createLight());

    const response = lights.reduce((lights, light, id) => {
      lights[id] = light;
      return lights;
    }, {});

    context.hue.get.mockReturnValue(response);

    await prefetchLights(context);

    expect(context.hue.precache).toHaveBeenCalledTimes(lights.length);
    lights.forEach((light, id) =>
      expect(context.hue.precache).toHaveBeenCalledWith(`lights/${id}`, light),
    );
  });
});
