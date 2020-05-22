import assert from 'assert';
import { validRooms } from './room';
import { sentenceCase } from 'change-case';

export default (mutation) => {
  const { name, class: _class, lights, ...patch } = mutation;

  if (typeof name === 'string') {
    assert(name.length <= 32, 'Name must be 32 characters or less');

    Object.assign(patch, { name });
  }

  if (typeof _class === 'string') {
    // Convert enum value to the case the API requires
    const casedClass = sentenceCase(_class);
    assert(validRooms.has(casedClass), 'Class must be a valid room');

    Object.assign(patch, { class: casedClass });
  }

  if (Array.isArray(lights)) {
    assert(
      lights.every((lightId) => lightId !== ''),
      'Lights list contains empty string',
    );

    Object.assign(patch, { lights });
  }

  return patch;
};
