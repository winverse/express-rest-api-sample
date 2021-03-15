const request = require('supertest');

const app = require('app');

const { User } = require('database/models');

async function generateToken(email) {
  if (!email) return;
  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('No exists user');
    }

    const loggedInfo = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: 'password' });

    const token = loggedInfo.headers['set-cookie'][0];

    return { token, user };
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = generateToken;
