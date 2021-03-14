const errorHandler = (err, req, res, next) => {
  // You will send an error message through slack or telegram...
  const message = err.stack || err;

  console.error(message);

  res.status(500).send(err.message || err);
  next();
};

module.exports = errorHandler;
