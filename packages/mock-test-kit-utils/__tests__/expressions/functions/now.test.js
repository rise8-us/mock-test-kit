const {
  isFunction,
  getFunction,
} = require('../../../lib/expressions/functions/now');

describe('now', () => {
  describe('isFunction', () => {
    it('should return true when the expression is a now function', () => {
      expect(isFunction('now(0,"sec")')).toBe(true);
    });

    it('should return false when the expression is not a now function', () => {
      expect(isFunction('now')).toBe(false);
      expect(isFunction('now(')).toBe(false);
      expect(isFunction('now)')).toBe(false);
      expect(isFunction('test()')).toBe(false);
    });
  });

  describe('getFunction', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

    it('should throw an error when given an invalid now function', () => {
      expect(() => getFunction('test()')).toThrowError(
        'The expression test() is not a valid now function.',
      );
    });

    it('should return a new date for number and seconds', () => {
      expect(getFunction(`now(3600, "sec")`)).toEqual('1577840400000');
    });

    it('should return a new date for number and ms', () => {
      expect(getFunction(`now(3600, "ms")`)).toEqual('1577836803600');
    });
  });
});
