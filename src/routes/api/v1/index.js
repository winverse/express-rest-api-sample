const express = require('express');

const v1 = express.Router();

const auth = require('./auth');

v1.use('/auth', auth);

module.exports = v1;
