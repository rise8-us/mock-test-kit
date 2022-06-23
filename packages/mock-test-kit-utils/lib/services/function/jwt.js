const fs = require('fs');
const path = require('path')
const jwt = require('jsonwebtoken');

const JWT_REGEX = /jwt\((.*\n*)\)/;

const applyJwt = (value) => {
  const mockJwt = value.match(JWT_REGEX);

  if (mockJwt) {
    return value.replace(JWT_REGEX, evalMockJwt(mockJwt));
  }

  return value;
}

const evalMockJwt = (mockJwt) => {
  let [payload, privateKey, options, passphrase] = JSON.parse(`[${mockJwt[1]}]`);

  const refinedPayload = {
    ...payload,
    exp: parseInt(payload.exp),
    iat: parseInt(payload.iat),
  };

  if (passphrase) {
    privateKey = fs.readFileSync(path.resolve('/tmp', privateKey));
  }

  return jwt.sign(refinedPayload, passphrase ? {key: privateKey, passphrase} : (privateKey || 'privateKey'), options || {}, null);
}

module.exports = {
  applyJwt,
}
