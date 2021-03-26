const formatResponse = (res, response) => {
  res.status(200).json({
    res: response,
    status: 200,
    err: null
  });
};

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (err.name === 'ValidationError') res.status(422);
    return next(err);
  });
};

module.exports = {
  formatResponse,
  asyncHandler
};
