export function removeFields(fields, obj) {
  if (!fields) {
    throw new Error('Please provide fields to de removed.');
  }

  if (!obj || !Object.keys(obj).length) {
    throw new Error('Please provide object.');
  }

  return fields.reduce((acc, field) => {
    delete acc[field];
    return acc;
  }, obj);
}
