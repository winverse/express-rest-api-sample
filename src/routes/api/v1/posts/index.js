const express = require('express');

const posts = express.Router();

const { needsAuth } = require('middleware');

const { write, list, read, update, remove } = require('./posts.ctrl');

posts.post('/', needsAuth, write);
posts.get('/', list);
posts.get('/:id', read);
posts.patch('/:id', needsAuth, update);
posts.delete('/:id', needsAuth, remove);

module.exports = posts;
