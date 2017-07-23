import color, { colorTypes } from '../color';

describe('The color converter', () => {
  it('passes sanity checks', () => {
    const result = color({ hue: 10, sat: 20, bri: 30 });

    expect(result).toEqual(expect.any(String));
    expect(result[0]).toBe('#');
    expect(result.length).toBe(7);
  });

  it('defaults to HSB', () => {
    const result = color({ hue: 10, sat: 20, bri: 30 });

    expect(result).toEqual(expect.any(String));
    expect(result).toMatchSnapshot();
  });

  it('understands XY color coordinates', () => {
    const result = color({ xy: [0.2, 0.7], bri: 10, colormode: colorTypes.XY });

    expect(result).toMatchSnapshot();
  });

  it('understands temperature encoding', () => {
    const result = color({ colormode: colorTypes.TEMP, ct: 238, bri: 32 });

    expect(result).toMatchSnapshot();
  });

  it('throws if HSB values are omitted', () => {
    expect(() => color({ sat: 20, bri: 30 })).toThrow(/hue/i);
    expect(() => color({ hue: 10, bri: 30 })).toThrow(/sat/i);
    expect(() => color({ hue: 10, sat: 20 })).toThrow(/bri/i);
  });

  it('throws if CT values are omitted', () => {
    const colormode = colorTypes.TEMP;

    expect(() => color({ colormode, ct: 100 })).toThrow(/bri/);
    expect(() => color({ colormode, bri: 100 })).toThrow(/temperature/);
  });

  it('throws if XY values are omitted', () => {
    const colormode = colorTypes.XY;

    expect(() => color({ colormode, xy: [0.2, 0.6] })).toThrow(/bri/);
    expect(() => color({ colormode, bri: 250 })).toThrow(/xy/i);
  });
});
