const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.orignalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : '🌸'
  });
};

module.exports = {
  notFound,
  errorHandler
};
