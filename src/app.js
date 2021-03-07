const express = require('express');

const routes = require('./routes');

// express를 이용한 서버 구현
const app = express();

app.use('/', routes);

module.exports = app;
