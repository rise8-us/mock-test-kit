FROM node:16.15.1-alpine as builder

WORKDIR /usr/src/app
RUN yarn global add lerna

COPY package.json .
COPY lerna.json .

COPY packages/mock-test-kit-utils ./packages/mock-test-kit-utils

