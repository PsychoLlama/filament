import mutation from '../state-mutations';

describe('State mutation', () => {
  it('passes through unrecognized props', () => {
    const data = { on: true, potato: 'enabled', things: 1.28 };
    const result = mutation(data);

    expect(result).toEqual(data);
  });

  it('replaces transitions with the hue equivalent', () => {
    const result = mutation({ transition: 1000, on: false });

    expect(result).toEqual({ transitiontime: 10, on: false });
  });

  it('formats color', () => {
    const color = '#FF00FF';
    const result = mutation({ color, on: true });

    expect(result).toMatchSnapshot();
  });

  it('works with rgb() color functions', () => {
    const color = 'rgb(255, 200, 150)';
    const result = mutation({ color });

    expect(result).toMatchSnapshot();
  });

  it('works with hsl color functions', () => {
    const color = 'hsl(330, 50%, 20%)';
    const result = mutation({ color });

    expect(result).toMatchSnapshot();
  });

  it('works with color names', () => {
    const result = mutation({ color: 'white' });

    expect(result).toEqual({ bri: 254, hue: 0, sat: 0 });
  });

  it('handles the hex code correctly', () => {
    const result = mutation({ color: '#ffffff' });

    expect(result.hue).toEqual(expect.any(Number));
    expect(result.sat).toEqual(expect.any(Number));
    expect(result.bri).toEqual(expect.any(Number));

    expect(isNaN(result.hue)).toBe(false);
    expect(isNaN(result.sat)).toBe(false);
    expect(isNaN(result.bri)).toBe(false);

    expect(result).toMatchSnapshot();
  });

  it('ensures the hue is properly adjusted', () => {
    const result = mutation({ color: 'purple' });

    expect(result.hue).toBeGreaterThan(0);
    expect(result.hue).toBeLessThanOrEqual(0xffff);
  });

  it('throws if the color is invalid', () => {
    const fail = () => mutation({ color: 'potato' });

    expect(fail).toThrow(/color/);
  });
});
