'use strict';

const path = require('path');
const { setupRest, createHandler } = require('../lib/setup');

describe('Setup', () => {
  jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
  const api = 'mock-api';

  it('should generate POST:GET /api/ide/recommend', async () => {
    const fastify = {
      post: jest.fn(),
      route: jest.fn(),
    };

    setupRest(api, path.join(__dirname, './routes/data'), fastify);

    expect(fastify.route).toBeCalledTimes(1);
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

    it('should return a 302', async () => {
      const endpoint = {
        GET: {
          data: [
            {
              service: 'ref-auth',
              path: '/authorize',
              method: 'GET',
              request: {
                params: {},
                query: {
                  client_id: '.*',
                  response_type: '.*',
                  scope: '.*',
                  redirect_uri: '.*',
                  state: '.*',
                  aud: '.*',
                },
              },
              response: [
                {
                  status: 302,
                  redirect:
                    '${{query.redirect_uri}}?code=Q8d1LU&state=${{query.state}}',
                },
              ],
            },
          ],
        },
      };

      const request = {
        query: {
          client_id: 'sand_man',
          response_type: 'code',
          scope: 'smart%2Forchestrate_launch%20user%2F*.*%20profile%20openid',
          redirect_uri: 'http%3A%2F%2Fsandbox%3A3001%2Fafter-auth',
          state: '33f75d44-98c5-94f1-5910-d6b0adb8978b',
          aud: 'http%3A%2F%2Flocalhost%3A8079%2Fhspc9%2Fdata',
        },
      };

      createHandler(endpoint, Object.keys(endpoint)[0])(request, reply);

      expect(mockReplyCode).toHaveBeenCalledWith(302);
      expect(mockReplyRedirect).toHaveBeenCalledWith(
        'http%3A%2F%2Fsandbox%3A3001%2Fafter-auth?code=Q8d1LU&state=33f75d44-98c5-94f1-5910-d6b0adb8978b',
      );
    });

    it('should return 200 with null values included', async () => {
      const endpoint = {
        GET: {
          data: [
            {
              service: 'ref-auth',
              path: '/api/clients',
              method: 'GET',
              request: {
                params: {},
                query: {
                  clientId: 'e26748e4-9c2a-46b9-b40b-a8992212edff',
                },
              },
              response: [
                {
                  status: 200,
                  body: {
                    id: 31,
                    clientId: 'e26748e4-9c2a-46b9-b40b-a8992212edff',
                    clientSecret: null,
                  },
                },
              ],
            },
          ],
        },
      };

      const request = {
        query: {
          clientId: 'e26748e4-9c2a-46b9-b40b-a8992212edff',
        },
      };

      createHandler(endpoint, Object.keys(endpoint)[0])(request, reply);

      expect(mockReplyCode).toHaveBeenCalledWith(
        endpoint.GET.data[0].response[0].status,
      );
      expect(mockReplySend).toHaveBeenCalledWith(
        endpoint.GET.data[0].response[0].body,
      );
    });

    it('should handle jwt', async () => {
      const endpoint = {
        POST: {
          data: [
            {
              service: 'ref-auth',
              path: '/token',
              method: 'POST',
              request: {
                params: {},
                query: {},
                body: {
                  code: '.*',
                  grant_type: 'authorization_code',
                  redirect_uri: '.*',
                  client_id: 'sand_man',
                },
              },
              response: [
                {
                  status: 200,
                  body: {
                    access_token:
                      '${{ jwt({"aud":"sand_man","iss":"http://sandbox:8060/","exp":"${{ now(3600,"sec") }}","iat":"${{ now(3600,"sec") }}","jti":"da046ccd-473b-43b1-8fc8-d93d9bb30d3d"},"secret",{"header":{"kid":"rsa1","jku":"http://sandbox:8060/jwk"}}) }}',
                    expires_in: 86399,
                    id_token:
                      '${{ jwt({"sub":"eaf0f6d3-6e45-46d4-9c0d-3a2383d352b7","aud":"sand_man","displayName":"laser shark","kid":"rsa1","iss":"http://sandbox:8060/","exp":"${{ now(3600,"sec") }}","iat":"${{ now(3600,"sec") }}","email":"va-lasershark-team@rise8.us"},"secret",{"header":{"kid":"rsa1"}}) }}',
                    scope: 'smart/orchestrate_launch openid user/*.* profile',
                    token_type: 'Bearer',
                  },
                },
              ],
            },
          ],
        },
      };

      const request = {
        body: {
          code: 'Q8d1LU',
          grant_type: 'authorization_code',
          redirect_uri: 'http://sandbox:3001/after-auth',
          client_id: 'sand_man',
        },
      };

      createHandler(endpoint, Object.keys(endpoint)[0])(request, reply);

      expect(mockReplyCode).toHaveBeenCalledWith(200);
      expect(mockReplySend).toHaveBeenCalledWith({
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InJzYTEiLCJqa3UiOiJodHRwOi8vc2FuZGJveDo4MDYwL2p3ayJ9.eyJhdWQiOiJzYW5kX21hbiIsImlzcyI6Imh0dHA6Ly9zYW5kYm94OjgwNjAvIiwiZXhwIjoxNTc3ODQwNDAwMDAwLCJpYXQiOjE1Nzc4NDA0MDAwMDAsImp0aSI6ImRhMDQ2Y2NkLTQ3M2ItNDNiMS04ZmM4LWQ5M2Q5YmIzMGQzZCJ9.XldmepZd2V6dlW5hs-XRaA4nZfB1kqpwuJpjalYQKNA',
        expires_in: 86399,
        id_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InJzYTEifQ.eyJzdWIiOiJlYWYwZjZkMy02ZTQ1LTQ2ZDQtOWMwZC0zYTIzODNkMzUyYjciLCJhdWQiOiJzYW5kX21hbiIsImRpc3BsYXlOYW1lIjoibGFzZXIgc2hhcmsiLCJraWQiOiJyc2ExIiwiaXNzIjoiaHR0cDovL3NhbmRib3g6ODA2MC8iLCJleHAiOjE1Nzc4NDA0MDAwMDAsImlhdCI6MTU3Nzg0MDQwMDAwMCwiZW1haWwiOiJ2YS1sYXNlcnNoYXJrLXRlYW1AcmlzZTgudXMifQ.u-P1oOiLaZijlUkCQj_0GRXOm45-EBDwYmsQYGtaM_w',
        scope: 'smart/orchestrate_launch openid user/*.* profile',
        token_type: 'Bearer',
      });
    });

    it('should match data and return a 200', () => {
      const request = {
        params: {},
        query: {},
      };
      const response = [
        {
          status: 200,
          body: {},
        },
      ];
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

      expect(mockReplyCode).toHaveBeenCalledWith(response[0].status);
      expect(mockReplySend).toHaveBeenCalledWith(response[0].body);
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
      const response = [
        {
          status: 200,
          body: {},
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
                  a: 'FD26394B-77B9-41A0-A473-744664A047DD',
                },
              },
            },
          ],
        },
      };

      createHandler(endpoint, Object.keys(endpoint)[0])(request, reply);

      expect(mockReplyCode).toHaveBeenCalledWith(response[0].status);
      expect(mockReplySend).toHaveBeenCalledWith(response[0].body);
    });

    it('should match query.redirect_uri then return a 301', () => {
      const request = {
        body: {},
        query: {
          redirect_uri: 'http://localhost:3000/callback',
        },
      };
      const response = [
        {
          status: 301,
          redirect: '${{query.redirect_uri}}',
        },
      ];
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

      expect(mockReplyCode).toHaveBeenCalledWith(response[0].status);
      expect(mockReplyRedirect).toHaveBeenCalledWith(
        request.query.redirect_uri,
      );
    });

    it('should not match data and return a 404', () => {
      const request = {
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
