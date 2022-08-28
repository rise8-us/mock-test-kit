import { RestResponseBuilder } from '../../src';

describe('RestResponseBuilder', () => {
  describe('withStatus', () => {
    it('should not allow status in 300 range without redirect', () => {
      expect(() => new RestResponseBuilder().withStatus(300)).toThrow(
        'Use withRedirect for status codes 300 - 308.',
      );
    });

    it('should allow status in 200 range unencumbered', () => {
      expect(new RestResponseBuilder().withStatus(200).build()).toStrictEqual({
        status: 200,
      });
    });

    it('should require message for status greater than 399', () => {
      expect(() => new RestResponseBuilder().withStatus(400).build()).toThrow(
        'Must include a message in the body for error responses.',
      );
      expect(() => new RestResponseBuilder().withStatus(451).build()).toThrow(
        'Must include a message in the body for error responses.',
      );
      expect(
        new RestResponseBuilder().withError(511, 'You have an error.').build(),
      ).toStrictEqual({
        status: 511,
        body: {
          message: 'You have an error.',
        },
      });
    });

    it('should not allow status to be set when redirect exists', () => {
      const builder = new RestResponseBuilder().withRedirect(301, '/foo');

      expect(() => builder.withStatus(200)).toThrow(
        'No reset for response.redirect.',
      );
    });
  });

  describe('withRedirect', () => {
    it('should allow status inside of 300 range', () => {
      expect(
        new RestResponseBuilder().withRedirect(300, '/foo').build(),
      ).toStrictEqual({
        status: 300,
        redirect: '/foo',
      });

      expect(
        new RestResponseBuilder().withRedirect(308, '/foo').build(),
      ).toStrictEqual({
        status: 308,
        redirect: '/foo',
      });

      expect(() =>
        // @ts-ignore ignoring to test js implementation
        new RestResponseBuilder().withRedirect(299, '/foo'),
      ).toThrow('withRedirect only supports status codes 300 - 308.');

      expect(() =>
        // @ts-ignore ignoring to test js implementation
        new RestResponseBuilder().withRedirect(400, '/foo'),
      ).toThrow('withRedirect only supports status codes 300 - 308.');
    });
  });
});
