# mock-test-kit-core

A library for creating Mock Test Kit .json files programmatically.

## Introduction

Mock Test Kit is a set of tools that allow you to create REST and GraphQL Federated mock data APIs.
Mock Test
Kit Core helps you build the mocked data to be served using the Mock Test Kit
API (`ghcr.io/rise8-us/mock-test-kit-api:latest`).

## Getting Started

See extended [documentation](docs/index.md) for more details on usage.

### Installing

```sh
npm install @rise8/mock-test-kit-core --save-dev
# or 
yarn add @rise8/mock-test-kit-core --dev
```

### Configuration

```yaml
# docker-compose.yml
services:
  mock-api:
    image: ghcr.io/rise8-us/mock-test-kit-api:latest
    ports:
      - "8080:8080"
    volumes:
      - "./infra/mock-data:/tmp/mock-data"
    environment:
      - PORT=8080
      - API_NAME=mock-api
      - WATCH=true // Used to watch for changes in the mock data directory
      - HEADERS=false // Used to enable pattern matching on headers
```

```javascript
// global-setup.js
import mtk from '@rise8/mock-test-kit-core';

mtk.initialize({
  outputDir: './infra/mock-data', // Set the output directory for json files
  development: false, // Set this to allow core library code to run during development
})
```

### Usage

```javascript
// page.test.js
import mtk, {
  Expr,
  Fn,
  Ctx,
  Match,  
} from '@rise8/mock-test-kit-core';

describe('page', () => {
  it('should load with "Hello ${name}" message', () => {
    mtk.generate(
        new Builder.RestRequest({
          service: 'mock-api',
          path: '/hello/:name',
          method: 'GET',
        })
        .withParam('name', Match.any())
        .addResponses(
            new Builder.RestResponse()
            .withStatus(200)
            .withBody({
              message: `Hello ${Expr.create(Ctx.getParam('name'))}`
            }).build()
        ).build()
    );
    // ... the rest of the test
  })
});
```

## Careers

Explore new opportunities with [Rise8](https://rise8.us/careers/).

