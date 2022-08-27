const { applyNow } = require('./function/now');
const { applyJwt } = require('./function/jwt');

const applySubstitutions = (value, request) => {
  let newValue = value;
  const substitutions = newValue.match(/{{([^{|}]*)}}/g);

  if (!substitutions) {
    return newValue;
  }

  substitutions.forEach((substitution) => {
    const [type, property] = substitution.replace(/{{|}}/g, '').split('.');
    newValue = newValue.replace(substitution, request[type][property]);
  });

  return newValue;
};

const substituteResponse = (response, request) => {
  const newResponse = JSON.parse(JSON.stringify(response));
  Object.keys(newResponse).forEach((key) => {
    if (typeof newResponse[key] === 'object') {
      Object.keys(newResponse[key]).forEach((subKey) => {
        // istanbul ignore next
        if (typeof newResponse[key][subKey] === 'string') {
          newResponse[key][subKey] = applyNow(newResponse[key][subKey]);
          newResponse[key][subKey] = applySubstitutions(
            newResponse[key][subKey],
            request,
          );
        }

        // istanbul ignore next
        if (typeof response[key][subKey] !== 'string') {
          return;
        }

        newResponse[key][subKey] = applyJwt(newResponse[key][subKey]);
      });
    }

    if (typeof newResponse[key] === 'string') {
      newResponse[key] = applyNow(newResponse[key]);
      newResponse[key] = applySubstitutions(newResponse[key], request);
    }
  });

  return newResponse;
};

module.exports = {
  applySubstitutions,
  substituteResponse,
};
