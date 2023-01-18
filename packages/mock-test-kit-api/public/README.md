# Static Files
## Quick Start
In your mock endpoint you can simply redirect to /public/README.md to get the contents of this file.
## Docker Compose
If you are using docker compose you can mount the public directory to /public in your container.
```yaml
    mock-api:
      container_name: mock-api
      image: ghcr.io/rise8-us/mock-test-kit-api:latest
      volumes:
        - ./public:/public
        - ./integration/mock-data:/tmp/mock-data
      environment:
        API_NAME: mock-api
        PORT: 3003
        WATCH: true
        HEADERS: true
```

The following would redirect a service call to `/document/1` to `/public/document/1.md` and return the contents of the file.
```json
[
  {
    "service": "mock-api",
    "path": "/document/:id",
    "method": "GET",
    "protocol": "http",
    "request": {
      "params": {
        "id": "1"
      }
    },
    "response": {
      "status": 301,
      "redirect": "/public/document.pdf"
    }
  }
]
```
