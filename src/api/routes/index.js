const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const categoryRouter = require('./category.route');
const postRouter = require('./post.route');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/post', postRouter);

module.exports = router;
