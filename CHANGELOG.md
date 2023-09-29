# Changelog

## [1.6.1](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v1.6.0...mock-test-kit-v1.6.1) (2023-09-29)


### Bug Fixes

* allow mock test kit api to bind to 0.0.0.0 in docker container ([37ec80b](https://github.com/rise8-us/mock-test-kit/commit/37ec80b9ddd12aa4d4d74b9cf3007f9fbced820e))

## [1.6.0](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v1.5.3...mock-test-kit-v1.6.0) (2023-01-18)


### Features

* add support for public route with static files that can be redirected to ([539268e](https://github.com/rise8-us/mock-test-kit/commit/539268e1dc29d7c32537434a4ea8baaf61d4f0f5))

## [1.5.3](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v1.5.2...mock-test-kit-v1.5.3) (2022-11-01)


### Bug Fixes

* reverting to support for amd only ([e464f41](https://github.com/rise8-us/mock-test-kit/commit/e464f414f1796b94015d15c5fb01807db0aa7cd6))

## [1.5.2](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v1.5.1...mock-test-kit-v1.5.2) (2022-11-01)


### Bug Fixes

* add matrix for multi arch builds ([e749191](https://github.com/rise8-us/mock-test-kit/commit/e749191e85472c4c3617176ba7d77090351aa780))

## [1.5.1](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v1.5.0...mock-test-kit-v1.5.1) (2022-11-01)


### Bug Fixes

* only support amd and arm in base image ([2821282](https://github.com/rise8-us/mock-test-kit/commit/2821282f8d5077b4845ea8c60a18f4317d4dcf50))

## [1.5.0](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v1.4.0...mock-test-kit-v1.5.0) (2022-11-01)


### Features

* only support amd and arm ([db8286f](https://github.com/rise8-us/mock-test-kit/commit/db8286f134d87de1c262463d4311865571b5473b))

## [1.4.0](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v1.3.0...mock-test-kit-v1.4.0) (2022-11-01)


### Features

* add multi architecture builds ([0ec77d1](https://github.com/rise8-us/mock-test-kit/commit/0ec77d15ddfbf9f5d9a99aa2c3b24880a6a6cc0c))

## [1.3.0](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v1.2.0...mock-test-kit-v1.3.0) (2022-10-31)


### Features

* add proxy functionality ([27281a1](https://github.com/rise8-us/mock-test-kit/commit/27281a10d48913c4d58ff3a22f531d5347a19ca2))

## [1.2.0](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v1.1.1...mock-test-kit-v1.2.0) (2022-10-19)


### Features

* add function expression base64Encode ([8eeecf8](https://github.com/rise8-us/mock-test-kit/commit/8eeecf8dd4d1853baedea74b46fc1ea68bc4e6ab))

## [1.1.1](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v1.1.0...mock-test-kit-v1.1.1) (2022-10-12)


### Bug Fixes

* handle buffers in websocket msg and do not default reply ([37261b1](https://github.com/rise8-us/mock-test-kit/commit/37261b1a27358445a15838eb68301fcee951bed0))

## [1.1.0](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v1.0.1...mock-test-kit-v1.1.0) (2022-10-11)


### Features

* add websocket support ([1391ecf](https://github.com/rise8-us/mock-test-kit/commit/1391ecf3d589ed9ef1c518403c417fb23a0b8b2c))
* **docs:** update README.md to use v1 specs ([b436160](https://github.com/rise8-us/mock-test-kit/commit/b4361607472e2ea3700c4694934f687cb72772e7))

## [1.0.1](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v1.0.0...mock-test-kit-v1.0.1) (2022-09-13)


### Bug Fixes

* failed to build on publish ([81e68ad](https://github.com/rise8-us/mock-test-kit/commit/81e68ad8d5fe492f8370918a2060a075c6bce595))

## [1.0.0](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v0.4.0...mock-test-kit-v1.0.0) (2022-09-13)


### ⚠ BREAKING CHANGES

* update to use expressions in utils and add headers

### Features

* add mock-test-kit-core package ([95b0024](https://github.com/rise8-us/mock-test-kit/commit/95b002464f9d1c1f9d05c4d58c3bf414a04cbb6a))


### Code Refactoring

* update to use expressions in utils and add headers ([3afbee5](https://github.com/rise8-us/mock-test-kit/commit/3afbee5de3909330a4b30026129cfbe5e35aff61))

## [0.4.0](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v0.3.0...mock-test-kit-v0.4.0) (2022-08-27)


### Features

* **development:** add linting ([b3ade11](https://github.com/rise8-us/mock-test-kit/commit/b3ade11f805a6a82159625aa06915ac5df09de99))
* **development:** add prettier ([e60c817](https://github.com/rise8-us/mock-test-kit/commit/e60c817ee72deded4ade9577cbf63f2a21f597ef))


### Bug Fixes

* update peerDeps and build with production to produce smaller docker image in mock-test-kit-api ([a6e1239](https://github.com/rise8-us/mock-test-kit/commit/a6e1239a2a296d95b01e15fd12ceece7a95a9dfb))

## [0.3.0](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v0.2.0...mock-test-kit-v0.3.0) (2022-08-27)


### Features

* add ability to read all json files recursively in target directory ([b7636f9](https://github.com/rise8-us/mock-test-kit/commit/b7636f99e7d0705b5ed12b6e74280e72d26f8aff))

## [0.2.0](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v0.1.4...mock-test-kit-v0.2.0) (2022-08-27)


### Features

* add watch mode to mock-test-kit-api ([9b07f7f](https://github.com/rise8-us/mock-test-kit/commit/9b07f7f27b26a7a0d6227d80cd911e562af6d2e6))

## [0.1.4](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v0.1.3...mock-test-kit-v0.1.4) (2022-08-25)


### Bug Fixes

* remove sha label from api docker image ([1e6fc1a](https://github.com/rise8-us/mock-test-kit/commit/1e6fc1a4212abdefcb728ccdadda54ea30ba0a38))

## [0.1.3](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v0.1.2...mock-test-kit-v0.1.3) (2022-08-25)


### Bug Fixes

* add latest tag to API docker image ([b43f610](https://github.com/rise8-us/mock-test-kit/commit/b43f6102b7fdad2cf4bfa86bf966d861335984cf))

## [0.1.2](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v0.1.1...mock-test-kit-v0.1.2) (2022-08-25)


### Bug Fixes

* adjust permissions in release-please ([69edb96](https://github.com/rise8-us/mock-test-kit/commit/69edb96211379ecd38bde1322a02fc2d5ebed24c))
* update dockerfiles ([0d06ee8](https://github.com/rise8-us/mock-test-kit/commit/0d06ee8fc0bac4f8ed6b9c780604881c6a0090d6))

## [0.1.1](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v0.1.0...mock-test-kit-v0.1.1) (2022-08-25)


### Bug Fixes

* update publish workflows to use correct tags ([119967c](https://github.com/rise8-us/mock-test-kit/commit/119967c5d7f682be204c98577500973fa81d6b56))

## [0.1.0](https://github.com/rise8-us/mock-test-kit/compare/mock-test-kit-v0.0.2...mock-test-kit-v0.1.0) (2022-08-25)


### Features

* Add substitutions, functions jwt and now, tests, and docs ([bde7083](https://github.com/rise8-us/mock-test-kit/commit/bde70839373f32aef0e01dad376aecbc40f362d2))
* Initial commit ([996612e](https://github.com/rise8-us/mock-test-kit/commit/996612eaf61adcd86c7a0d0582d42c9ccb90f854))


### Bug Fixes

* Naming in dockerfile ([2118679](https://github.com/rise8-us/mock-test-kit/commit/21186796cd1441f53643f8cea1afbe7808ea7936))
* retry v0.0.1 ([018451c](https://github.com/rise8-us/mock-test-kit/commit/018451c95b97ecba0002d52c73365640c2ab3ac3))
* Try another solution for building base image ([68946c9](https://github.com/rise8-us/mock-test-kit/commit/68946c94dcc719ac1b664dcef98a6d2fae22c63f))
