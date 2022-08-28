# Rest Usage

```javascript
import {
  RestRequestBuilder,
  RestResponseBuilder,
  Expression,
  Matcher,
  RequestBuilder,
  Query
} from '@rise8/mock-test-kit-core'
import customerCartPage1 from './customer-cart-page-1.json';
import customerCartPage2 from './customer-cart-page-2.json';

describe('Commerce Website', () => {
  const restRequestBuilder = new RestRequestBuilder('auth-api', '/authorize', 'GET');
  const tokenEndpoint = MockTestKit.addRestEndpoint({
    'api': 'auth-api',
    'path': '/token',
    'method': 'POST',
  });
  const cartEndpoint = MockTestKit.addRestEndpoint({
    'api': 'cart-api',
    'path': '/cart/:customerId',
    'method': 'GET',
  });

  test('user should be able to login', () => {
    // requestBuilder.withQueryParams({
    //   'client_id': Matcher.any(),
    //   'response_type': Matcher.any(),
    //   'scope': Matcher.any(),
    //   'redirect_uri': Matcher.any(),
    //   'state': Matcher.any(),
    //   'aud': Matcher.any(),
    //
    // });
    const responseBuilder = new RestResponseBuilder().
      withStatus(200).
      withBody({
        scope: new Expression.Context.QueryParam('scope'), // ${{ query.scope }}
        token: new Expression.Function.Jwt(
            'HS256',
            {
              'sub': '1234567890',
              'name': `Mr. ${new Expression.Context.QueryParam('name')}`,
              'iat': new Expression.Function.Now(),
              'exp': new Expression.Function.Now().add(1, 'hour'),
            },
            'secret'
        ),
      });
    requestBuilder.
      withQueryParam('client_id', Matcher.any()).
      withQueryParam('response_type', Matcher.any()).
      withQueryParam('scope', Matcher.any()).
      withQueryParam('redirect_uri', Matcher.any()).
      withQueryParam('state', Matcher.any()).
      withQueryParam('aud', Matcher.any());
    requestBuilder.withHeader('Authorization', Matcher.any()).withQueryParam('client_id', Matcher.any()).addResponses(responseBuilder.build()).build();

    tokenEndpoint.addRequest(new RequestBuilder({
      'body': {
        'code': new Matcher('.*'),
        'grant_type': 'authorization_code',
        'redirect_uri': new Matcher('.*'),
        'client_id': new Matcher('.*'),
      }
    })
    .withResponse({
      status: 200,
      body: {
        client_id: new Expression('body', 'client_id'),
        access_token: new Jwt(
            {
              aud: 'some_auth',
              iss: 'http://localhost:8080/',
              exp: new Now(3600, sec),
              iat: new Now(3600, sec),
            },
            'private.key',
            {
              algorithm: 'RS256'
            },
            'super-secret-passphrase'
        ),
        expires_in: 86399,
        scope: 'openid profile',
        token_type: 'Bearer'
      }
    })
    .build());

    // ...
  });

  test('user should be able to view cart', () => {
    const mockRequest = new RequestBuilder({
      headers: {
        'Authorization': new Matcher('Bearer [A-z0-9-]+'),
      },
      params: {
        customerId: 1,
      },
      query: {
        page: new Matcher('^[0-9]+$'),
      }
    })
    .withResponse({
      'status': 200,
      'body': customerCartPage1,
    })
    .withResponse({
      'status': 200,
      'body': customerCartPage2,
    })
    .build();

    loginEndpoint.addRequest(mockRequest);

    // ...
  });
})

```
