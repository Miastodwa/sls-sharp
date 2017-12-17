# !WORK IN PROGRESS!

# sls-sharp

Serverless Lambda function for on-the-fly image resizing and processing in your AWS bucket. Using awsome sharp library.

## Installation
```
yarn
yarn build:sharp
```
#### Why `build:sharp`?
Sharp needs to build it's libraries before you can use it. See: [reference](http://sharp.dimens.io/en/stable/install/#aws-lambda). It needs a different build on your local machine, and different for Lambda. `build:sharp` Does the following work:
- install `sharp` package and build it for your system.
- move that package into your project root folder and rename it to `./sharp-local`.
- install `sharp` package again, but this time build it for Lambda environment.
#### How to reference `sharp` in your functions:
When you reference sharp in your functions during local development, use `require('../../sharp-local')`. When you deploy to Lambda, replace it with `require('sharp')`. *Hint:* use env variables to replace that path automatically. This function uses an env variable called `SHARP` to determine which which build should be used. For example:
`const sharp = process.env.SHARP === 'local' ? require('../../sharp-local') : require('sharp')`


## Run function locally
- `yarn local:test` – locally run 'test' function, with a sample event (`fixtures/event.json`)
- `yarn watch:test` – same, but with watch enabled
- `yarn serve` – Spin up local server to serve the function over localhost:3000


## Deployment
- `deploy` – deploy to AWS, env: dev
- `deploy:stage` – deploy to AWS, env: stage
- `deploy:production` – deploy to AWS, env: production
- `deploy:env` – deploy to AWS, env: current NODE_ENV
