require('./env');
const app = require('app');

// 비구조화 할당 금지 cosnt { PORT } = process.env; (X)
const PORT = process.env.PORT;

if (!PORT) {
  throw new Error('MISSING_EVVAR');
}

// 서버 동작
const server = app.listen(PORT, () => {
  console.log(`Server is running, port number is ${PORT} `);
});

module.exports = server;
