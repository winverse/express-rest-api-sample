const db = require('./db');

const { models } = db;

const associate = () => {
  Object.values(models).forEach(model => {
    if (model.associate) {
      model.associate(models);
    }
  });
};

const sync = () => {
  associate();
  db.sync({ force: true });
};

module.exports = { associate, sync };
