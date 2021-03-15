const { nanoid } = require('nanoid');

const randomEmail = () => `${nanoid(7)}@gmail.com`;

module.exports = randomEmail;
