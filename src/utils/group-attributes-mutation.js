import assert from 'assert';
import { isValid as isValidRoom } from './room'
import { sentenceCase } from 'change-case'

export default mutation => {
  const { name, class: _class, ...patch } = mutation;

  if (typeof name === 'string') {
    assert(name.length <= 32, 'Name must be 32 characters or less');

    Object.assign(patch, { name });
  }

  if (typeof _class === 'string') {
    // Convert enum value to the case the API requires
    const casedClass = sentenceCase(_class)
    assert(isValidRoom(casedClass), 'Class must be a valid room');

    Object.assign(patch, { class: casedClass });
  }

  return patch;
};
