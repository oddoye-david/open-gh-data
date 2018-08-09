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

export function capitalize(str = '', separator = ' ') {
  const parts = str.split(separator);
  const uppercasedParts = parts.map((part) => {
    if (part.includes('-')) {
      return capitalize(part, '-');
    }
    return `${(part[0] || '').toUpperCase()}${[...part]
      .slice(1)
      .join('')
      .toLowerCase()}`;
  });

  return uppercasedParts.join(separator);
}
