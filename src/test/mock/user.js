const { nanoid } = require('nanoid');

const { User } = require('database/models');
const { randomEmail } = require('test/helper');

const makeRaw = (text = '') => {
  const payload = {
    email: `${randomEmail()}`,
    username: `${nanoid(5)}`,
    password: 'password',
  };

  const buildPayload = {
    email: `${randomEmail()}`,
    username: `${nanoid(5)}_${text}`,
    password:
      '1c8e432462648d825ade4983da4b1c9cc231180d3dd0e77b0cfe0b28c5e2f2b39aa3adabfcd5e1fe968b9e815005cf67499c30177f4c0199e39064ceaa5adefa',
  };

  return { payload, buildPayload };
};

const mockUser = async () => {
  try {
    const { payload, buildPayload } = makeRaw();

    const user = await User.build(buildPayload).save();

    return { user, payload, buildPayload };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mockUser;
