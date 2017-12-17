# sls-sharp

Serverless, on-the-fly image resing and processing for AWS Lambda. Using sharp.

## Development
This is a straight up Lambda function build build with Serverless framework.

### Installation:
```
yarn
yarn build:sharp
```
**Why `build:sharp`?**
Sharp needs to build it's libraries before you can use it. See: [reference](http://sharp.dimens.io/en/stable/install/#aws-lambda). It needs a different build on your local machine, and different for Lambda. `build:sharp` Does the following work:
- install `sharp` package and build it for your system.
- move that package into your project root folder and rename it to `./sharp-local`.
- install `sharp` package again, but this time build it for Lambda environment.

When you reference sharp in your functions during local development, use `require('../../sharp-local')`. When you deploy to Lambda, replace it with `require('sharp')`. Hint: use env variables to replace that path automatically.
