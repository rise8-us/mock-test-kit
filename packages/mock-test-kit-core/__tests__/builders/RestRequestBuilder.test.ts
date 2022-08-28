import { Builder, Match } from '../../src';

describe('RestRequestBuilder', () => {
  let requestBuilder: Builder.RestRequest;

  beforeEach(() => {
    requestBuilder = new Builder.RestRequest('test', 'foo', '/bar', 'GET');
  });

  describe('constructor', () => {
    it('should allow creation', () => {
      expect(requestBuilder.build()).toStrictEqual({
        id: 'test',
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
            foo: Match.all().toString(),
          })
          .build(),
      ).toEqual(
        expect.objectContaining({
          request: {
            headers: {
              foo: Match.all().toString(),
            },
          },
        }),
      );
    });

    it('should throw error when adding headers that already exists', () => {
      expect(() =>
        requestBuilder
          .withHeaders({
            foo: Match.all().toString(),
          })
          .withHeaders({
            foo: Match.all().toString(),
          }),
      ).toThrow('No reset for request.headers.');
    });
  });

  describe('withHeader', () => {
    it('should allow adding header', () => {
      expect(requestBuilder.withHeader('foo', Match.all()).build()).toEqual(
        expect.objectContaining({
          request: {
            headers: {
              foo: Match.all().toString(),
            },
          },
        }),
      );
    });

    it('should throw error when adding header that already exists', () => {
      expect(() =>
        requestBuilder
          .withHeader('foo', Match.all())
          .withHeader('foo', Match.all()),
      ).toThrow('Header foo already exists.');
    });
  });

  describe('withParams', () => {
    it('should allow adding params', () => {
      expect(
        requestBuilder
          .withParams({
            foo: Match.all().toString(),
          })
          .build(),
      ).toEqual(
        expect.objectContaining({
          request: {
            params: {
              foo: Match.all().toString(),
            },
          },
        }),
      );
    });

    it('should throw error when adding param that already exists', () => {
      expect(() =>
        requestBuilder
          .withParams({
            foo: Match.all().toString(),
          })
          .withParams({
            foo: Match.all().toString(),
          }),
      ).toThrow('No reset for request.params.');
    });
  });

  describe('withParam', () => {
    it('should allow adding param', () => {
      expect(requestBuilder.withParam('foo', Match.all()).build()).toEqual(
        expect.objectContaining({
          request: {
            params: {
              foo: Match.all().toString(),
            },
          },
        }),
      );
    });

    it('should throw error when adding param that already exists', () => {
      expect(() =>
        requestBuilder
          .withParam('foo', Match.all())
          .withParam('foo', Match.all()),
      ).toThrow('Param foo already exists.');
    });
  });

  describe('withQueryParams', () => {
    it('should allow adding query params', () => {
      expect(
        requestBuilder
          .withQueryParams({
            foo: Match.all(),
          })
          .build(),
      ).toEqual(
        expect.objectContaining({
          request: {
            query: {
              foo: Match.all().toString(),
            },
          },
        }),
      );
    });

    it('should throw error when adding query param that already exists', () => {
      expect(() =>
        requestBuilder
          .withQueryParams({
            foo: Match.all().toString(),
          })
          .withQueryParams({
            foo: Match.all().toString(),
          }),
      ).toThrow('No reset for request.query.');
    });
  });

  describe('withQueryParam', () => {
    it('should allow adding query param', () => {
      expect(requestBuilder.withQueryParam('foo', Match.all()).build()).toEqual(
        expect.objectContaining({
          request: {
            query: {
              foo: Match.all().toString(),
            },
          },
        }),
      );
    });

    it('should throw error when adding query param that already exists', () => {
      expect(() =>
        requestBuilder
          .withQueryParam('foo', Match.all())
          .withQueryParam('foo', Match.all()),
      ).toThrow('Query param foo already exists.');
    });
  });

  describe('withBodyParams', () => {
    it('should allow adding body', () => {
      expect(
        requestBuilder
          .withBodyParams({
            foo: Match.all(),
          })
          .build(),
      ).toEqual(
        expect.objectContaining({
          request: {
            body: {
              foo: Match.all().toString(),
            },
          },
        }),
      );
    });

    it('should throw error when adding body that already exists', () => {
      expect(() =>
        requestBuilder
          .withBodyParams({
            foo: Match.all(),
          })
          .withBodyParams({
            foo: Match.all(),
          }),
      ).toThrow('No reset for request.body.');
    });
  });
});
