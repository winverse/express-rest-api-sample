/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');

const db = require('./db');

const associate = () => {
  const dir = path.join(__dirname, './models');
  fs.readdirSync(dir).forEach(model => {
    const table = require(`./models/${model}`);
    if (table.associate) {
      table.associate();
    }
  });
};

const sync = () => {
  associate();
  db.sync({ force: true });
};

module.exports = sync;
