const Sequelize = require('sequelize');
const db = require('database/db');

const { generateToken } = require('lib/token');

const User = db.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    indexs: [
      {
        fields: ['username', 'email'],
      },
    ],
  },
);

User.prototype.generateUserToken = async function generateUserToken() {
  const refreshToken = await generateToken(
    {
      user: this,
    },
    {
      subject: 'refresh_token',
      expiresIn: '30d',
    },
  );

  const accessToken = await generateToken(
    {
      user: this,
    },
    {
      subject: 'access_token',
      expiresIn: '1h',
    },
  );

  return {
    refreshToken,
    accessToken,
  };
};

User.prototype.refreshUserToken = async function refreshUserToken(
  refreshTokenExp,
  originalRefreshToken,
) {
  const now = new Date().getTime();
  const diff = refreshTokenExp * 1000 - now;
  let refreshToken = originalRefreshToken;

  // 15일 이하인 경우
  if (diff < 1000 * 60 * 60 * 24 * 15) {
    refreshToken = await generateToken(
      {
        user: this,
      },
      {
        subject: 'refresh_token',
        expiresIn: '30d',
      },
    );
  }
  const accessToken = await generateToken(
    {
      user: this,
    },
    {
      subject: 'access_token',
      expiresIn: '1h',
    },
  );

  return { refreshToken, accessToken };
};

module.exports = User;
