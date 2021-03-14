const express = require('express');

const auth = express.Router();

const { needsAuth } = require('middleware');
const { register, login, logout, check } = require('./auth.ctrl');

auth.post('/register', register);
auth.post('/login', login);
auth.post('/logout', needsAuth, logout);
auth.get('/check', needsAuth, check);

module.exports = auth;
