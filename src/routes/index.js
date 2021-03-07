const express = require('express');
const { format } = require('date-fns');

const routes = express.Router();

const api = require('./api');

routes.use('/api', api);

routes.get('/ping', (req, res) => {
  const now = new Date();
  const time = format(now, 'yyyy-MM-dd HH:mm:ss');
  const text = `Current Time: ${time}`;
  res.send(text);
});

module.exports = routes;
