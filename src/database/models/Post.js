const Sequelize = require('sequelize');
const db = require('database/db');

const User = require('./User');

const Post = db.define(
  'post',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: Sequelize.STRING(100),
    text: Sequelize.TEXT,
    fk_user_id: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    indexs: [
      {
        fields: ['user_id'],
      },
    ],
  },
);

Post.associate = () => {
  Post.belongsTo(User, {
    foreignKey: 'fk_user_id',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  });
};

module.exports = Post;
