exports.handler = function(event, context, callback) {
  // See this AWS Document for this example Authorizer Function
  // https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html#api-gateway-lambda-authorizer-lambda-function-create

  // Retrieve request parameters from the Lambda function input:
  const headers = event.headers;

  // Parse the input for the parameter values
  const tmp = event.methodArn.split(':');
  const apiGatewayArnTmp = tmp[5].split('/');
  const awsAccountId = tmp[4];
  const region = tmp[3];
  const [restApiId, stage, method ] = apiGatewayArnTmp;

  let resource = '/'; // root resource
  if (apiGatewayArnTmp[3]) {
    resource += apiGatewayArnTmp[3];
  }

  console.log('Request details: ', { restApiId, stage, method, region, awsAccountId, resource });

  // We are just going to reply with an allow in this example.
  callback(null, generateAllow('me', event.methodArn));
}

// Help function to generate an IAM policy
const generatePolicy = function(principalId, effect, resource) {
  // Required output:
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17'; // default version
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke'; // default action
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  // Optional output with custom properties of the String, Number or Boolean type.
  authResponse.context = {
    "stringKey": "stringval",
    "numberKey": 123,
    "booleanKey": true
  };
  return authResponse;
}

const generateAllow = function(principalId, resource) {
  return generatePolicy(principalId, 'Allow', resource);
}

const generateDeny = function(principalId, resource) {
  return generatePolicy(principalId, 'Deny', resource);
}