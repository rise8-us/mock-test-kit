FROM node:12.18.1-alpine as builder

ARG NPM_TOKEN

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN yarn install --production

###################

FROM node:12.18.1-alpine
EXPOSE 3002


RUN apk update \
    && apk upgrade \
    && apk add --no-cache \
    jq

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG PORT
ENV PORT=${PORT}
ARG GIT_SHA
ENV GIT_SHA=${GIT_SHA}

COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/yarn.lock .
COPY --from=builder /usr/src/app/app.js .
COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD ["yarn", "start"]
