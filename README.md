# Example WebSocket API Gateway with SAM Template and WebSocket Request Authorizer

This repo is the code for the article I wrote [here](https://medium.com/build-succeeded/defining-websocket-api-gateway-endpoints-in-a-sam-template-4380ac5ef01b).

## Install

```
yarn install
```

## Deploy to AWS

First make sure your [AWS CLI credentials are configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).

Next, make sure you have the [SAM CLI installed](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) and working.

```
yarn deploy
```

## Files

The **test** route handler is defined in the `index.js` file.

The **Request Authorizer** is in the `authorizer.js` file.

The **SAM Template** is the `template.yaml` file.