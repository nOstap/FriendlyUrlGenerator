## Terminology

 - Url Pair - Our domain model/aggregate. Include **Soruce Url** and **Friendly Path**
 - Friendly Path - Genearted set of random words which are used to find **Source Url**`.
 - Source Url - Url that will be used as a redirect target when user navigates to **Friendly Url**.
 - Friendly Url - https://[domain]/[friendly path] (eg. https://fug.co.uk/foo-bar-foo-bar)

## Installation

```bash
$ npm install
```

## Configuration
```bash
$ cp .env.example .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
