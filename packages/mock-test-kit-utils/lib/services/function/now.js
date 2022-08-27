const applyNow = (value) => {
  if (typeof value !== 'string') {
    return value;
  }

  let newValue = value;
  const REGEXG = /now\((-?\d+),([\w]+)\)/g;
  const REGEX = /now\((-?\d+),([\w]+)\)/;

  const globalMatches = value.match(REGEXG) || [];

  for (const globalMatch of globalMatches) {
    const [, num, unit] = globalMatch.match(REGEX);

    if (unit === 'sec') {
      const newDate = (Date.now() / 1000 + parseInt(num)) * 1000;

      return newValue.replace(globalMatch, newDate.toString());
    }

    if (unit === 'ms') {
      const newDate = Date.now() + parseInt(num);

      return newValue.replace(globalMatch, newDate.toString());
    }
  }

  return newValue;
};

module.exports = {
  applyNow,
};
