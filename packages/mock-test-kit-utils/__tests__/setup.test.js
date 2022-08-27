'use strict';

const path = require('path');
const { setupRest, createHandler } = require('../lib/setup');

describe('Setup', () => {
  const api = 'mock-api';

  it('should generate POST:GET /api/ide/recommend', async () => {
    const fastify = {
      get: jest.fn(),
      post: jest.fn(),
    };

    setupRest(api, path.join(__dirname, './routes/data'), fastify);

    expect(fastify.get).toBeCalledTimes(1);
    expect(fastify.post).toBeCalledTimes(1);
  });

  describe('createHandler', () => {
    const mockReplyRedirect = jest.fn();
    const mockReplySend = jest.fn();
    const mockReplyCode = jest.fn(() => ({
      send: mockReplySend,
      headers: jest.fn(() => ({
        send: mockReplySend,
        redirect: mockReplyRedirect,
      })),
    }));
    const reply = {
      code: mockReplyCode,
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should match data and return a 200', () => {
      const request = {
        params: {},
        query: {},
      };
      const response = {
        status: 200,
        body: {},
      };
      const endpoint = {
        POST: {
          data: [
            {
              response,
              request,
            },
          ],
        },
      };

      createHandler(endpoint, Object.keys(endpoint)[0])(request, reply);

      expect(mockReplyCode).toHaveBeenCalledWith(response.status);
      expect(mockReplySend).toHaveBeenCalledWith(response.body);
    });

    it('should match params, query, and body then return a 200', () => {
      const request = {
        body: {},
        params: {
          user: 'user',
        },
        query: {
          a: 'FD26394B-77B9-41A0-A473-744664A047DD',
        },
      };
      const response = {
        status: 200,
        body: {},
      };
      const endpoint = {
        POST: {
          data: [
            {
              response,
              request: {
                body: {},
                params: {
                  user: 'user',
                },
                query: {
                  a: 'FD26394B-77B9-41A0-A473-744664A047DD',
                },
              },
            },
          ],
        },
      };

      createHandler(endpoint, Object.keys(endpoint)[0])(request, reply);

      expect(mockReplyCode).toHaveBeenCalledWith(response.status);
      expect(mockReplySend).toHaveBeenCalledWith(response.body);
    });

    it('should match query.redirect_uri then return a 301', () => {
      const request = {
        body: {},
        query: {
          redirect_uri: 'http://localhost:3000/callback',
        },
      };
      const response = {
        status: 301,
        redirect: '{{query.redirect_uri}}',
      };
      const endpoint = {
        POST: {
          data: [
            {
              response,
              request,
            },
          ],
        },
      };

      createHandler(endpoint, Object.keys(endpoint)[0])(request, reply);

      expect(mockReplyCode).toHaveBeenCalledWith(response.status);
      expect(mockReplyRedirect).toHaveBeenCalledWith(
        request.query.redirect_uri,
      );
    });

    it('should not match data and return a 404', () => {
      const request = {
        params: {},
        query: {
          a: 'FD26394B-77B9-41A0-A473-744664A047DD',
        },
      };
      const response = {
        status: 200,
        body: {},
      };
      const endpoint = {
        POST: {
          data: [
            {
              response,
              request: {},
            },
          ],
        },
      };

      createHandler(endpoint, Object.keys(endpoint)[0])(request, reply);

      expect(mockReplyCode).toHaveBeenCalledWith(404);
    });

    it('should not match params and return a 404', () => {
      const request = {
        params: {
          x: 'FD26394B-77B9-41A0-A473-744664A047DD',
        },
        query: {
          a: 'FD26394B-77B9-41A0-A473-744664A047DD',
        },
      };
      const response = {
        status: 200,
        body: {},
      };
      const endpoint = {
        POST: {
          data: [
            {
              response,
              request: {
                params: {},
                query: {
                  a: 'FD26394B-77B9-41A0-A473-744664A047DD',
                },
              },
            },
          ],
        },
      };

      createHandler(endpoint, Object.keys(endpoint)[0])(request, reply);

      expect(mockReplyCode).toHaveBeenCalledWith(404);
    });

    it('should not match query and return a 404', () => {
      const request = {
        params: {
          x: 'FD26394B-77B9-41A0-A473-744664A047DD',
        },
        query: {
          a: 'FD26394B-77B9-41A0-A473-744664A047DD',
        },
      };
      const response = {
        status: 200,
        body: {},
      };
      const endpoint = {
        POST: {
          data: [
            {
              response,
              request: {
                params: {
                  x: 'FD26394B-77B9-41A0-A473-744664A047DD',
                },
                query: {},
              },
            },
          ],
        },
      };

      createHandler(endpoint, Object.keys(endpoint)[0])(request, reply);

      expect(mockReplyCode).toHaveBeenCalledWith(404);
    });

    it('should match params, query, and body then return a 409, 200, 409, and 200', () => {
      const request = {
        body: {},
        params: {
          user: 'user',
        },
        query: {
          a: '849F533C-F720-40E6-9B27-707566B3B030',
        },
      };
      const response = [
        {
          status: 409,
          body: {
            message: 'There was a conflict.',
          },
        },
        {
          status: 200,
          body: {
            userId: '849F533C-F720-40E6-9B27-707566B3B030',
          },
        },
      ];
      const endpoint = {
        POST: {
          data: [
            {
              response,
              request: {
                body: {},
                params: {
                  user: 'user',
                },
                query: {
                  a: '849F533C-F720-40E6-9B27-707566B3B030',
                },
              },
            },
          ],
        },
      };

      const handler = createHandler(endpoint, Object.keys(endpoint)[0]);

      handler(request, reply);
      expect(mockReplyCode).toHaveBeenCalledWith(409);

      handler(request, reply);
      expect(mockReplyCode).toHaveBeenCalledWith(200);

      handler(request, reply);
      expect(mockReplyCode).toHaveBeenCalledWith(409);

      handler(request, reply);
      expect(mockReplyCode).toHaveBeenCalledWith(200);
    });
  });
});
