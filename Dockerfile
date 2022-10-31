FROM node:18.12.0-alpine as builder

WORKDIR /usr/src/app
RUN yarn global add lerna

COPY package.json .
COPY yarn.lock .
COPY lerna.json .

COPY packages/mock-test-kit-utils ./packages/mock-test-kit-utils

