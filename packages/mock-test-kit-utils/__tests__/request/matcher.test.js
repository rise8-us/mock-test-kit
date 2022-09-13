const { isMatch } = require('../../lib/request/matcher');

describe('Matcher', () => {
  describe('isMatch', () => {
    it('should match when both are empty', () => {
      const mockRequest = {};
      const actualRequest = {};

      expect(isMatch(actualRequest, mockRequest)).toBe(true);
    });

    it('should not match when both are different types', () => {
      const mockRequest = {
        foo: true,
      };
      const actualRequest = {
        foo: 'true',
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(false);
    });

    it('should not match when both are different types of object', () => {
      const mockRequest = {
        foo: {},
      };
      const actualRequest = {
        foo: [],
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(false);
    });

    it('should not match when both are different types of object reversed', () => {
      const mockRequest = {
        foo: [],
      };
      const actualRequest = {
        foo: {},
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(false);
    });

    it('should not match when both have unbalanced number of properties', () => {
      const mockRequest = {
        foo: 'bar',
      };
      const actualRequest = {
        foo: 'bar',
        bar: 'baz',
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(false);
    });

    it('should match when both have same properties', () => {
      const mockRequest = {
        foo: 'bar',
        bar: 'baz',
      };
      const actualRequest = {
        foo: 'bar',
        bar: 'baz',
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(true);
    });

    it('should not match when both have different properties', () => {
      const mockRequest = {
        foo: 'bar',
        baz: 'bar',
      };
      const actualRequest = {
        foo: 'bar',
        bar: 'baz',
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(false);
    });

    it('should not match when both same property with different objects', () => {
      const mockRequest = {
        foo: {
          bar: 'baz',
        },
      };
      const actualRequest = {
        foo: {
          baz: 'bar',
        },
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(false);
    });

    it('should match when both have same properties with different order', () => {
      const mockRequest = {
        foo: 'bar',
        bar: 'baz',
      };
      const actualRequest = {
        bar: 'baz',
        foo: 'bar',
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(true);
    });

    it('should not match when both have same property with different string', () => {
      const mockRequest = {
        foo: 'bar',
      };
      const actualRequest = {
        foo: 'baz',
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(false);
    });

    it('should match when both have deep properties', () => {
      const mockRequest = {
        foo: {
          bar: 'baz',
        },
        bar: [
          {
            baz: 'qux',
          },
        ],
      };
      const actualRequest = {
        bar: [
          {
            baz: 'qux',
          },
        ],
        foo: {
          bar: 'baz',
        },
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(true);
    });

    it('should match when both have in order arrays', () => {
      const mockRequest = {
        foo: [1, 2, 3],
      };
      const actualRequest = {
        foo: [1, 2, 3],
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(true);
    });

    it('should match when both have out of order arrays', () => {
      const mockRequest = {
        foo: [1, 3, 2],
      };
      const actualRequest = {
        foo: [3, 2, 1],
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(true);
    });

    it('should not match when both have different arrays', () => {
      const mockRequest = {
        foo: [3, 2],
      };
      const actualRequest = {
        foo: [3, 2, 1],
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(false);
    });

    it('should match when both have booleans', () => {
      const mockRequest = {
        foo: true,
      };
      const actualRequest = {
        foo: true,
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(true);
    });

    it('should not match when both have different booleans', () => {
      const mockRequest = {
        foo: true,
      };
      const actualRequest = {
        foo: false,
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(false);
    });

    it('should match when regex in string matches', () => {
      const mockRequest = {
        foo: '.*',
      };
      const actualRequest = {
        foo: 'bar',
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(true);
    });

    it('should match when using regex flags', () => {
      const mockRequest = {
        foo: '/bAr/i',
      };
      const actualRequest = {
        foo: 'bar',
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(true);
    });

    it('should not match when regex does not match', () => {
      const mockRequest = {
        foo: '/foo/',
      };
      const actualRequest = {
        foo: 'bar',
      };

      expect(isMatch(actualRequest, mockRequest)).toBe(false);
    });
  });
});
