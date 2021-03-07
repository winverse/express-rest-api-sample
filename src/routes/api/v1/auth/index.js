const express = require('express');

const auth = express.Router();

const { register, login, logout, check } = require('./auth.ctrl');

auth.post('/register', register);
auth.post('/login', login);
auth.post('/logout', logout);
auth.get('/check', check);

module.exports = auth;
