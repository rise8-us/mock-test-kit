# `mock-test-kit-api`

You need to create a graphql schema file that uses your API_NAME `mock-api.graphql` and 
serve it in `/tmp/schema`.

```yaml
    mock-api:
      container_name: mock-api
      image: mock-test-kit-api:latest
      extra_hosts:
        - "host.docker.internal:${DOCKER_BRIDGE_IP:-172.17.0.1}"
      ports:
        - 3003:3003
      environment:
        API_NAME: mock-api
        PORT: 3003
      volumes:
        - ./integration/mock-data:/tmp/mock-data
        - ./infrastructure/schema:/tmp/schema
```
