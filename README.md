# mock-test-kit

A test kit for mocking REST and Federated GraphQL APIs

## Careers

Explore new opportunities with [Rise8](https://rise8.us/careers/).

## Usage

### Compose `mock-test-kit-api`

If you intend to use GraphQL API then provide a graphql schema file that uses your API_NAME
`mock-api.graphql` and serve it in `/tmp/schema`.

```yaml
    mock-api:
      container_name: mock-api
      image: ghcr.io/rise8-us/mock-test-kit-api:latest
      extra_hosts: # optional
        - "host.docker.internal:${DOCKER_BRIDGE_IP:-172.17.0.1}"
      ports:
        - 3003:3003
      environment:
        API_NAME: mock-api
        PORT: 3003
        WATCH: true # optional (defaults false)
        HEADERS: true # optional (defaults false)
      volumes:
        - ./integration/mock-data:/tmp/mock-data
        - ./infrastructure/schema:/tmp/schema # optional (used for GraphQL)
```

### Create JSON data

You can create any directory to store your mock JSON data files. In our example we will use the
directory`./integration/mock-data`.

#### REST Schema

```json
{
  "api": {
    "type": "string",
    "pattern": "^[A-z0-9-]+$"
  },
  "endpoint": {
    "type": "string",
    "pattern": "^\/[A-z0-9\/-]+$"
  },
  "httpMethod": {
    "type": "string",
    "pattern": "^(DELETE|GET|OPTIONS|PATCH|POST|PUT)$"
  },
  "request": {
    "type": "object",
    "properties": {
      "body": {
        "type": "string"
      },
      "params": {
        "type": "object"
      },
      "query": {
        "type": "object"
      }
    }
  },
  "response": {
    "type": "object",
    "properties": {
      "status": {
        "type": "integer",
        "minimum": 200,
        "maximum": 500
      },
      "headers": {
        "type": "object"
      },
      "body": {
        "type": "object | array | string | number | boolean | null"
      }
    }
  }
}
```

#### GraphQL Schema

```json
{
  "api": {
    "type": "string",
    "pattern": "^[A-z0-9-]+$"
  },
  "endpoint": {
    "type": "string",
    "pattern": "\/graphql"
  },
  "request": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "pattern": "^(Query|Mutation)$"
      },
      "resolver": {
        "type": "string",
        "pattern": "^[A-z0-9]+$"
      },
      "params": {
        "type": "object"
      }
    }
  },
  "response": {
    "type": "object",
    "properties": {
      "body": {
        "type": "object | array | string | number | boolean | null"
      }
    }
  }
}
```

### Matching requests

We match requests by params, query, and body. You can use regular expressions as matchers. For
example if I want to match all requests with `/users/{id}` then I can use the following

```json
{
  "api": "api",
  "endpoint": "/users/{id}",
  "httpMethod": "GET",
  "request": {
    "params": {
      "id": ".+"
    }
  },
  "response": {
    "status": 200
  }
}
```

### Use Substitutions

Generally, you may want to use request data to append to your response. You can use any key from
`params`, `query` or `body` to substitute a value.

Say for example I want to use the `id` parameter to append to the response.

```json
{
  "api": "mock-api",
  "endpoint": "/users/{id}",
  "httpMethod": "GET",
  "request": {
    "params": {
      "id": ".+"
    }
  },
  "response": {
    "status": 200,
    "body": {
      "id": "{{params.id}}"
    }
  }
}
```

### Use now()

You can use the `now` function to provide dynamic dateTime values in ms.

In the following example we can return the milliseconds for the time number of seconds ago. Notice
we pair it with substitutions. Subs always happen first.

```json
{
  "api": "mock-api",
  "endpoint": "/time/seconds/{number}/ago",
  "httpMethod": "GET",
  "request": {
    "params": {
      "number": "\\d+"
    }
  },
  "response": {
    "status": 200,
    "body": "now(-{{params.number}},sec)"
  }
}
```

### Use jwt()

You can use `jwt` function to provide dynamic jwt tokens. It uses the `jsonwebtoken` library under
the hood.

```js
/**
 * jwt(payload, keyOrKeyFilepath, options, passphrase) 
 * @param payload
 * @param secretOrFilename
 * @param options
 * @param passphrase
 */
```
In the following example we create a token simply using a secret.

```json
{
  "api": "auth",
  "endpoint": "/token",
  "httpMethod": "POST",
  "request": {
    "params": {},
    "query": {},
    "body": {
      "code": ".*",
      "grant_type": "authorization_code",
      "redirect_uri": ".*",
      "client_id": ".*"
    }
  },
  "response": {
    "status": 200,
    "body": {
      "access_token": "jwt({\"aud\":\"some_auth\",\"iss\":\"http://localhost:8080/\",\"exp\":\"now(3600,sec)\",\"iat\":\"now(3600,sec)\"},\"secret\",{})",
      "expires_in": 86399,
      "scope": "openid profile",
      "token_type": "Bearer"
    }
  }
}
```

Next we create a token using RS256, a private key file, and a passphrase. Keep in mind that any key
files you include must be found in `/tmp`. In the case of docker you will need to mount to `/tmp`.

```json
{
  "api": "auth",
  "endpoint": "/token",
  "httpMethod": "POST",
  "request": {
    "params": {},
    "query": {},
    "body": {
      "code": ".*",
      "grant_type": "authorization_code",
      "redirect_uri": ".*",
      "client_id": ".*"
    }
  },
  "response": {
    "status": 200,
    "body": {
      "access_token": "jwt({\"aud\":\"some_auth\",\"iss\":\"http://localhost:8080/\",\"exp\":\"now(3600,sec)\",\"iat\":\"now(3600,sec)\"},\"private.key\",{\"algorithm\":\"RS256\"},\"super-secret-passphrase\")",
      "expires_in": 86399,
      "scope": "openid profile",
      "token_type": "Bearer"
    }
  }
}
```

## Development
### Build Base Image
From the root of the project, run the following command:
```shell
docker build -t mock-test-kit/base .
```

### Build API Image
From the root of the `mock-test-kit-api` package:
```shell
docker build -t ghcr.io/rise8-us/mock-test-kit-api .
```

