import Color from 'hue-colors';

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

    const [hue, sat, bri] = Color.fromHex('ff00ff').toHsb();

    expect(result).toEqual({ hue, sat, bri, on: true });
  });

  it('throws if the hash symbol is omitted', () => {
    const fail = () => mutation({ color: 'ffffff' });

    expect(fail).toThrow(/(hash|#)/i);
  });

  it('throws if the color length is unexpected', () => {
    const fail = () => mutation({ color: '#1234567' });

    expect(fail).toThrow(/length/);
    expect(fail).toThrow(/7/);
  });

  it('throws if the color characters are invalid', () => {
    const fail = () => mutation({ color: '#0agz%.' });

    expect(fail).toThrow(/character/i);
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
});
