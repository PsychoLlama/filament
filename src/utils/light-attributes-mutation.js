import assert from 'assert';

export default mutation => {
  const { name, ...patch } = mutation;

  if (typeof name === 'string') {
    assert(name.length <= 32, 'Name must be 32 characters or less');

    Object.assign(patch, { name });
  }

  return patch;
};
