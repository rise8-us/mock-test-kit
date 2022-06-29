FROM ghcr.io/mock-test-kit/base:latest as builder

WORKDIR /usr/src/app

COPY . ./packages/mock-test-kit-api

RUN lerna bootstrap

WORKDIR /usr/src/app/packages/mock-test-kit-api

CMD ["yarn", "start"]
