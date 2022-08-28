import { Matcher, RestRequestBuilder } from '../../src';

describe('RestRequestBuilder', () => {
  let requestBuilder: RestRequestBuilder;

  beforeEach(() => {
    requestBuilder = new RestRequestBuilder('foo', '/bar', 'GET');
  });

  describe('constructor', () => {
    it('should allow creation', () => {
      expect(requestBuilder.build()).toStrictEqual({
        service: 'foo',
        path: '/bar',
        method: 'GET',
        request: {},
        response: [],
      });
    });
  });

  describe('withHeaders', () => {
    it('should allow adding headers', () => {
      expect(
        requestBuilder
          .withHeaders({
            foo: Matcher.any().toString(),
          })
          .build(),
      ).toEqual(
        expect.objectContaining({
          request: {
            headers: {
              foo: Matcher.any().toString(),
            },
          },
        }),
      );
    });

    it('should throw error when adding headers that already exists', () => {
      expect(() =>
        requestBuilder
          .withHeaders({
            foo: Matcher.any().toString(),
          })
          .withHeaders({
            foo: Matcher.any().toString(),
          }),
      ).toThrow('No reset for request.headers.');
    });
  });

  describe('withHeader', () => {
    it('should allow adding header', () => {
      expect(requestBuilder.withHeader('foo', Matcher.any()).build()).toEqual(
        expect.objectContaining({
          request: {
            headers: {
              foo: Matcher.any().toString(),
            },
          },
        }),
      );
    });

    it('should throw error when adding header that already exists', () => {
      expect(() =>
        requestBuilder
          .withHeader('foo', Matcher.any())
          .withHeader('foo', Matcher.any()),
      ).toThrow('Header foo already exists.');
    });
  });

  describe('withParams', () => {
    it('should allow adding params', () => {
      expect(
        requestBuilder
          .withParams({
            foo: Matcher.any().toString(),
          })
          .build(),
      ).toEqual(
        expect.objectContaining({
          request: {
            params: {
              foo: Matcher.any().toString(),
            },
          },
        }),
      );
    });

    it('should throw error when adding param that already exists', () => {
      expect(() =>
        requestBuilder
          .withParams({
            foo: Matcher.any().toString(),
          })
          .withParams({
            foo: Matcher.any().toString(),
          }),
      ).toThrow('No reset for request.params.');
    });
  });

  describe('withParam', () => {
    it('should allow adding param', () => {
      expect(requestBuilder.withParam('foo', Matcher.any()).build()).toEqual(
        expect.objectContaining({
          request: {
            params: {
              foo: Matcher.any().toString(),
            },
          },
        }),
      );
    });

    it('should throw error when adding param that already exists', () => {
      expect(() =>
        requestBuilder
          .withParam('foo', Matcher.any())
          .withParam('foo', Matcher.any()),
      ).toThrow('Param foo already exists.');
    });
  });

  describe('withQueryParams', () => {
    it('should allow adding query params', () => {
      expect(
        requestBuilder
          .withQueryParams({
            foo: Matcher.any().toString(),
          })
          .build(),
      ).toEqual(
        expect.objectContaining({
          request: {
            query: {
              foo: Matcher.any().toString(),
            },
          },
        }),
      );
    });

    it('should throw error when adding query param that already exists', () => {
      expect(() =>
        requestBuilder
          .withQueryParams({
            foo: Matcher.any().toString(),
          })
          .withQueryParams({
            foo: Matcher.any().toString(),
          }),
      ).toThrow('No reset for request.query.');
    });
  });

  describe('withQueryParam', () => {
    it('should allow adding query param', () => {
      expect(
        requestBuilder.withQueryParam('foo', Matcher.any()).build(),
      ).toEqual(
        expect.objectContaining({
          request: {
            query: {
              foo: Matcher.any().toString(),
            },
          },
        }),
      );
    });

    it('should throw error when adding query param that already exists', () => {
      expect(() =>
        requestBuilder
          .withQueryParam('foo', Matcher.any())
          .withQueryParam('foo', Matcher.any()),
      ).toThrow('Query param foo already exists.');
    });
  });

  describe('withBodyParams', () => {
    it('should allow adding body', () => {
      expect(
        requestBuilder
          .withBodyParams({
            foo: Matcher.any().toString(),
          })
          .build(),
      ).toEqual(
        expect.objectContaining({
          request: {
            body: {
              foo: Matcher.any().toString(),
            },
          },
        }),
      );
    });

    it('should throw error when adding body that already exists', () => {
      expect(() =>
        requestBuilder
          .withBodyParams({
            foo: Matcher.any().toString(),
          })
          .withBodyParams({
            foo: Matcher.any().toString(),
          }),
      ).toThrow('No reset for request.body.');
    });
  });

  describe('withBodyParam', () => {
    it('should allow adding body param', () => {
      expect(
        requestBuilder.withBodyParam('foo', Matcher.any()).build(),
      ).toEqual(
        expect.objectContaining({
          request: {
            body: {
              foo: Matcher.any().toString(),
            },
          },
        }),
      );
    });

    it('should throw error when adding body param that already exists', () => {
      expect(() =>
        requestBuilder
          .withBodyParam('foo', Matcher.any())
          .withBodyParam('foo', Matcher.any()),
      ).toThrow('Body param foo already exists.');
    });
  });
});
