const getRegex = (regexString) => {
  const validRegex = regexString.match(/^\/(.*)\/(.*)$/);

  if (validRegex) {
    return new RegExp(validRegex[1], validRegex[2]);
  }

  return regexString;
};

const isMatch = (actual, mock) => {
  const mockKeys = Object.keys(mock);
  const actualKeys = Object.keys(actual);

  if (mockKeys.length !== actualKeys.length) {
    return false;
  }

  for (let i = 0; i < mockKeys.length; i++) {
    const key = mockKeys[i];

    if (typeof mock[key] !== typeof actual[key]) {
      return false;
    }

    if (
      (Array.isArray(mock[key]) && !Array.isArray(actual[key])) ||
      (Array.isArray(actual[key]) && !Array.isArray(mock[key]))
    ) {
      return false;
    }

    if (
      Array.isArray(mock[key]) &&
      !isMatch(mock[key].sort(), actual[key].sort())
    ) {
      return false;
    }

    if (typeof actual[key] === 'object' && !isMatch(actual[key], mock[key])) {
      return false;
    }

    if (typeof actual[key] === 'boolean' && actual[key] !== mock[key]) {
      return false;
    }

    if (typeof actual[key] === 'string') {
      const regex = getRegex(mock[key]);
      const doesMatch = new RegExp(regex).test(actual[key]);

      if (!doesMatch) {
        return false;
      }
    }
  }

  return true;
};
module.exports = {
  isMatch,
};
