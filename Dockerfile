FROM node:18.12.0-alpine as builder

WORKDIR /usr/src/app
# install python
RUN apk add --no-cache python3 make g++

RUN yarn global add lerna@5.4.3

COPY package.json .
COPY yarn.lock .
COPY lerna.json .

COPY packages/mock-test-kit-utils ./packages/mock-test-kit-utils

