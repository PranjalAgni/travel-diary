const omitKey = (arr, blackListedKeys) => {
  return arr.map((obj) => {
    return Object.entries(obj).reduce((acc, [key, val]) => {
      if (!blackListedKeys.includes(key)) {
        acc[key] = val;
      }
      return acc;
    }, {});
  });
};

module.exports = {
  omitKey
};
