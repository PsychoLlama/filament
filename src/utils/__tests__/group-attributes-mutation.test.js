import mutation from '../group-attributes-mutation';

describe('Group attributes mutation', () => {
  it('passes through unrecognized props', () => {
    const data = { name: 'foo', potato: 'enabled', things: 1.28 };
    const result = mutation(data);

    expect(result).toEqual(data);
  });

  it('passes through unrecognized props when no recognized props are passed', () => {
    const data = { potato: 'enabled', things: 1.28 };
    const result = mutation(data);

    expect(result).toEqual(data);
  });

  it('throws if the name is too long', () => {
    const fail = () => mutation({ name: 'foozbarzfoozbarzfoozbarzfoozbarz1' });

    expect(fail).toThrow(/name/i);
  });

  it('accepts valid single-word class values', () => {
    const data = { class: 'Bedroom' };
    const result = mutation(data);

    expect(result).toEqual(data);
  });

  it('accepts valid multi-word class values', () => {
    const data = { class: 'LivingRoom' };
    const result = mutation(data);

    expect(result).toEqual({ class: 'Living room' });
  });

  it('throws if the class is invalid', () => {
    const fail = () => mutation({ class: 'FooBar' });

    expect(fail).toThrow(/class/i);
  });

  it('accepts valid lights values', () => {
    const data = { lights: ['1', '2', '3'] };
    const result = mutation(data);

    expect(result).toEqual(data);
  });

  it('throws if the lights list contains empty strings', () => {
    const fail = () => mutation({ lights: ['1', '2', ''] });

    expect(fail).toThrow(/lights/i);
  });
});
