const express = require('express');

const auth = express.Router();

const { needsAuth } = require('middleware');
const { register, login, logout } = require('./auth.ctrl');

auth.post('/register', register);
auth.post('/login', login);
auth.post('/logout', needsAuth, logout);

module.exports = auth;
