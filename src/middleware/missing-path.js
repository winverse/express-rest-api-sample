const missingPath = (req, res, next) => {
  const message = 'MISSING_PATH';
  next(message);
};

module.exports = missingPath;
