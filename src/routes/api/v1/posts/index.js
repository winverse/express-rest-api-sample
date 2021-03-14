const express = require('express');

const posts = express.Router();

const { needsAuth } = require('middleware');

const { write, list, read, update, remove } = require('./posts.ctrl');

posts.post('/', needsAuth, write);
posts.get('/', list);
posts.get('/:postId', read);
posts.patch('/:postId', needsAuth, update);
posts.delete('/:postId', needsAuth, remove);

module.exports = posts;
