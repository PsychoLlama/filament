import assert from 'assert';

export default (mutation) => {
  if (typeof mutation.name === 'string') {
    assert(mutation.name.length <= 32, 'Name must be 32 characters or less');
  }

  return mutation;
};
