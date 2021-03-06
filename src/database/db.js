const { Sequelize } = require('sequelize');

const {
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_USER,
  POSTGRES_PW,
} = process.env;

const db = new Sequelize(POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PW, {
  host: POSTGRES_HOST,
  dialect: 'postgres',
  define: {
    underscored: true,
  },
  // https://sequelize.org/master/manual/connection-pool.html 참고
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: console.log,
});

module.exports = db;
