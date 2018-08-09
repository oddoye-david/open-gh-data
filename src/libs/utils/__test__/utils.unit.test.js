import { removeFields } from '../index';

describe('Utils tests', () => {
  describe('removeFields tests', () => {
    it('should remove indicated fields from object', () => {
      const fieldsToRemove = ['field1', 'field2'];
      const object = { field1: 'value1', field2: 'value2', field3: 'value3' };

      const expected = { field3: 'value3' };
      const actual = removeFields(fieldsToRemove, object);
      expect(actual).toEqual(expected);
    });

    it('should throw if no fields indicated', () => {
      const object = { field1: 'value1', field2: 'value2', field3: 'value3' };

      expect(() => {
        removeFields(undefined, object);
      }).toThrow(new Error('Please provide fields to de removed.'));
    });

    it('should throw if no object provided', () => {
      const fieldsToRemove = ['field1', 'field2'];

      expect(() => {
        removeFields(fieldsToRemove, undefined);
      }).toThrow(new Error('Please provide object.'));
    });
  });
});
