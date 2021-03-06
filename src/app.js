const express = require('express');

// express를 이용한 서버 구현
const app = express();

app.use('/ping', (req, res) => {
  res.send('pong');
});

module.exports = app;
