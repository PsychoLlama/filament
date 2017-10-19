// Note: although it's possible to extract this from the RoomClass enum,
// it would need to be compiled first, which is only done in schema.js
export const validRooms = [
  'Living room',
  'Kitchen',
  'Dining',
  'Bedroom',
  'Kids bedroom',
  'Bathroom',
  'Nursery',
  'Recreation',
  'Office',
  'Gym',
  'Hallway',
  'Toilet',
  'Front door',
  'Garage',
  'Terrace',
  'Garden',
  'Driveway',
  'Carport',
  'Other'
]

export const isValid = room => validRooms.includes(room)
