const consumeToken = require('./consume-token');
const needsAuth = require('./needs-auth');
const errorHandler = require('./error-handler');
const missingPath = require('./missing-path');

module.exports = {
  consumeToken,
  needsAuth,
  errorHandler,
  missingPath,
};
