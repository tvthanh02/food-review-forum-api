const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const categoryRouter = require('./category.route');
const postRouter = require('./post.route');
const uploadRouter = require('./upload.route');
const rateRouter = require('./rate.route');
const commentRouter = require('./comment.route');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/post', postRouter);
router.use(uploadRouter);
router.use('/rate', rateRouter);
router.use('/comment', commentRouter);

module.exports = router;
