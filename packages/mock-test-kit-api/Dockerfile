FROM node:12.18.1-alpine as builder

ARG NPM_TOKEN

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN yarn install --production

###################

FROM node:12.18.1-alpine
EXPOSE 3005

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG GIT_SHA
ENV GIT_SHA=${GIT_SHA}

COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/yarn.lock .
COPY --from=builder /usr/src/app/routes ./routes
COPY --from=builder /usr/src/app/app.js .
COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD ["yarn", "start"]
