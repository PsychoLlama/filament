import mutation from '../light-attributes-mutation';

describe('Light attributes mutation', () => {
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
});
