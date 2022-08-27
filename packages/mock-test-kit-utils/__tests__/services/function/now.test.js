const { applyNow } = require('../../../lib/services/function/now');

describe('now', () => {
  describe('applyNow', () => {
    it('should return the same value when value not a string', () => {
      const value = null;
      const actualValue = applyNow(value);

      expect(actualValue).toBe(value);
    });

    it('should return the same value when no now() is found', () => {
      const value = 'foo';
      const actualValue = applyNow(value);

      expect(actualValue).toBe(value);
    });

    it('should return new value when now() adds seconds', () => {
      const now = Date.now() + 1000;
      const value = 'now(1,sec)';
      const actualValue = applyNow(value);

      expect(parseInt(actualValue)).toBeGreaterThanOrEqual(now);
    });

    it('should return new value when now() subtracts seconds', () => {
      const now = Date.now() - 1000;
      const value = 'now(-1,sec)';
      const actualValue = applyNow(value);

      expect(parseInt(actualValue)).toBeGreaterThanOrEqual(now);
    });

    it('should return new value when now() adds milliseconds', () => {
      const now = Date.now() + 1;
      const value = 'now(1,ms)';
      const actualValue = applyNow(value);

      expect(parseInt(actualValue)).toBeGreaterThanOrEqual(now);
    });

    it('should return new value when now() subtracts milliseconds', () => {
      const now = Date.now() - 1;
      const value = 'now(-1,ms)';
      const actualValue = applyNow(value);

      expect(parseInt(actualValue)).toBeGreaterThanOrEqual(now);
    });
  });
});
