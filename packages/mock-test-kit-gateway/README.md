# `mock-test-kit-gateway`

In your docker-compose.yaml add:

```yaml
    mock-qraphql-gateway:
        container_name: mock-graphql-gateway
        image: mock-test-kit-gateway:latest
        extra_hosts:
            - "host.docker.internal:${DOCKER_BRIDGE_IP:-172.17.0.1}"
        ports:
            - 3002:3002
        environment:
            PORT: 3002
        volumes:
            - ./infrastructure/graphql-gateway:/tmp/gateway
```
