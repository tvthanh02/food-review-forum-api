const express = require('express');
const router = express.Router();
const HttpResponseHandler = require('../helpers/http-response-handler.helper');
const PostController = require('../controllers/post.controller');
const upload = require('../../config/multer.config');
const { checkLogin } = require('../middlewares/auth.middleware');
const {
  checkBadRequest,
  checkMulterError,
} = require('../middlewares/common.middleware');

router.get('/', async (req, res) => {
  const { data, message, error } = await PostController.getAllPosts(req.query);
  if (error) HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, error } = await PostController.getDetailPost(id);
  if (error) return HttpResponseHandler.InternalServerError(res);
  if (!data) return HttpResponseHandler.NotFound(res);
  HttpResponseHandler.Success(res, data, message);
});

router.post(
  '/create',
  checkLogin,
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'thumbnail', maxCount: 1 },
    { name: 'videos', maxCount: 2 },
  ]),
  checkMulterError,
  checkBadRequest([
    'position',
    'food_name',
    'province',
    'maps',
    'description',
    'images',
    'videos',
    'thumbnail',
    'categories',
    'user_id',
  ]),
  async (req, res) => {
    const { data, message, error } = await PostController.createPost({
      requestBody: req.body,
      requestFiles: req.files,
    });
    if (error) return HttpResponseHandler.InternalServerError(res, message);
    HttpResponseHandler.Success(res, data);
  }
);

router.patch('/update/:id', (req, res) => {
  // update post
  res.end();
});

router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, error } = PostController.deletePost(id);
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

module.exports = router;
