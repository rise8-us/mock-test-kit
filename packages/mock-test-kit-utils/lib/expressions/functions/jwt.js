const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const REGEX = /jwt\((.*\n*)\)/;

const isFunction = (expression) => new RegExp(REGEX).test(expression);

const getFunction = (func) => {
  if (!isFunction(func)) {
    throw new Error(`The expression ${func} is not a valid jwt function.`);
  }

  const jwtFunc = func.replace(REGEX, '$1');

  let [payload, privateKey, options, passphrase] = JSON.parse(`[${jwtFunc}]`);

  if (!payload) {
    throw new Error('Missing payload when calling jwt.');
  }

  if (!privateKey) {
    throw new Error('Missing secret or private key when calling jwt.');
  }

  if (!payload.exp || !payload.iat) {
    throw new Error(
      'Missing payload exp and/or iat. These are required fields.',
    );
  }

  if (passphrase) {
    if (!options || !options.algorithm) {
      throw new Error(
        'Missing options algorithm. This is required when using passphrase and private key.',
      );
    } else {
      privateKey = fs.readFileSync(path.resolve('/tmp', privateKey)).toString();
    }
  }

  const refinedPayload = {
    ...payload,
    exp: parseInt(payload.exp),
    iat: parseInt(payload.iat),
  };

  return jwt.sign(
    refinedPayload,
    passphrase ? { key: privateKey, passphrase } : privateKey || 'privateKey',
    options || {},
    null,
  );
};

module.exports = {
  isFunction,
  getFunction,
};
