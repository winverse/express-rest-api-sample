require('./env');
const app = require('app');

// 비구조화 할당 금지 cosnt { PORT } = process.env; (X)
const PROT = process.env.PORT;

// 서버 동작
const server = app.listen(PROT, () => {
  console.log(`Server is running, port number is ${PROT} `);
});

module.exports = server;
