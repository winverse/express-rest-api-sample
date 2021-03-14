const express = require('express');

const v1 = express.Router();

const auth = require('./auth');
const posts = require('./posts');
const files = require('./files');

v1.use('/auth', auth);
v1.use('/posts', posts);
v1.use('/files', files);

module.exports = v1;
