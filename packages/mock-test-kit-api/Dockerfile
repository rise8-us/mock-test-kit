FROM mock-test-kit/base as builder

WORKDIR /usr/src/app

COPY . ./packages/mock-test-kit-api

RUN lerna bootstrap -- --production --ignore-scripts

WORKDIR /usr/src/app/packages/mock-test-kit-api

CMD ["./start.sh"]
