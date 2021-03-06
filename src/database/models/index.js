/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');

const models = [];

fs.readdirSync(__dirname).forEach(model => {
  const module = require(`./${model}`);
  if (module.associate) {
    module.associate();
  }
  models.push(module);
});

module.exports = {
  ...models,
};
