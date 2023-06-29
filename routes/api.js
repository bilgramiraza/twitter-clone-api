const express = require('express');
const router = express.Router();

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

router.use('/posts', postsRouter);
router.use('/users', usersRouter);

module.exports = router;
