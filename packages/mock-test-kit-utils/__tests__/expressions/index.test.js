const { apply, traverseResponseAndApply } = require('../../lib/expressions');

describe('expressions', () => {
  describe('apply', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

    it('should handle sequential contexts', () => {
      const request = {
        query: {
          seconds: 3600,
          unit: 'sec',
        },
      };

      const value = '${{query.seconds}} ${{query.unit}}';
      const newValue = apply(value, request);

      expect(newValue).toEqual('3600 sec');
    });

    it('should be able to traverse expressions recursively', () => {
      const request = {
        query: {
          sec: 3600,
          unit: 'sec',
        },
      };

      const value = '${{now(${{query.${{query.unit}}}},"${{query.unit}}")}}';
      const newValue = apply(value, request);

      expect(newValue).toEqual('1577840400000');
    });
  });

  describe('traverseResponseAndApply', () => {
    it('should traverse the response and apply expressions', () => {
      const request = {
        query: {
          sec: 3600,
          unit: 'sec',
        },
      };

      const response = {
        time: {
          now: '${{now(${{query.${{query.unit}}}},"${{query.unit}}")}}',
        },
        sec: '${{ query.sec }}',
      };

      const newResponse = traverseResponseAndApply(response, request);

      expect(newResponse).toEqual({
        sec: '3600',
        time: {
          now: '1577840400000',
        },
      });
    });
  });
});
