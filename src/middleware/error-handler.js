const errorHandler = (err, req, res, next) => {
  // You will send an error message through slack or telegram...
  console.error(err.stack);

  res.status(500).send(err.message);
  next();
};

module.exports = errorHandler;
