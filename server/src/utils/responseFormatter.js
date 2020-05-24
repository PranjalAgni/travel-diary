const formatResponse = (res, response) => {
  res.status(200).json({
    res: response,
    status: 200,
    err: null
  })
};


module.exports = {
  formatResponse
}