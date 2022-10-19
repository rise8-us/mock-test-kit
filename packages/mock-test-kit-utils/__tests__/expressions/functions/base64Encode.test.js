const {
  isFunction,
  getFunction,
} = require('../../../lib/expressions/functions/base64Encode');

describe('base64Encode', () => {
  describe('isFunction', () => {
    it('should return true when the expression is a base64Encode function', () => {
      expect(isFunction('base64Encode({})')).toBe(true);
    });

    it('should return false when the expression is not a base64Encode function', () => {
      expect(isFunction('base64Encode')).toBe(false);
      expect(isFunction('base64Encode(')).toBe(false);
      expect(isFunction('base64Encode)')).toBe(false);
      expect(isFunction('test()')).toBe(false);
    });
  });

  describe('getFunction', () => {
    it('should throw an error when given an invalid base64Encode function', () => {
      expect(() => getFunction('test()')).toThrowError(
        'The expression test() is not a valid base64Encode function.',
      );
    });

    it('should return a base64 encoded string when given a json object', () => {
      expect(getFunction(`base64Encode({})`)).toEqual('e30=');
    });

    it('should return a base64 encoded string when given a string', () => {
      expect(getFunction(`base64Encode(Hi I'm a string)`)).toEqual(
        'SGkgSSdtIGEgc3RyaW5n',
      );
    });
  });
});
