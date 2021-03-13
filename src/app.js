const express = require('express');
const cookieParser = require('cookie-parser');

const { consumeToken } = require('middleware');
const routes = require('./routes');

// express를 이용한 서버 구현
const app = express();

app.use(cookieParser());
app.use(consumeToken);

app.use('/', routes);

module.exports = app;
