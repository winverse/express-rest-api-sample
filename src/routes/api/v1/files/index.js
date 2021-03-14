const express = require('express');

const files = express.Router();

const { multerStorage, needsAuth } = require('middleware');

const { uploads } = require('./files.ctrl');

files.post('/', needsAuth, multerStorage.single('file'), uploads);

module.exports = files;
