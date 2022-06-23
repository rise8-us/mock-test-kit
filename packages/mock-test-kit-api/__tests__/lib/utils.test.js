const { parseJsonContentType } = require('../../lib/utils');

describe('utils', () => {
  describe('parseJsonContentType', () => {
    const done = jest.fn();
    const req = {
      headers: {
        'content-type': 'application/json',
      },
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should parse json content type', () => {
      const body = '{"foo": "bar"}';
      parseJsonContentType(req, body, done);
      expect(done).toHaveBeenCalledWith(null, { foo: 'bar' });
    });

    it('should return empty object if body is empty', () => {
      const body = '';
      parseJsonContentType(req, body, done);
      expect(done).toHaveBeenCalledWith(null, {});
    });

    it('should return empty object if body is undefined', () => {
      const body = undefined;
      parseJsonContentType(req, body, done);
      expect(done).toHaveBeenCalledWith(null, {});
    });

    it('should return empty object if body is null', () => {
      const body = null;
      parseJsonContentType(req, body, done);
      expect(done).toHaveBeenCalledWith(null, {});
    });

    it('should return error if content type is not json', () => {
      const body = 'this is not json';
      parseJsonContentType(req, body, done);
      expect(done).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 400 }),
        undefined
      );
    });
  });
});
