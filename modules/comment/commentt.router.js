const commentRouter = require('express').Router();
const {
  createNewComment,
  updateComment,
  findCommentByProductId,
  deleteComment,
} = require('./comment.service');
const { isAuth } = require('../../middlewares/authmiddlewares');
const {
  validateRules,
  validateResults,
} = require('../../middlewares/validation-middlewares');

commentRouter.post(
  '/createComment',
  validateRules('createComment'),
  validateResults,
  isAuth,
  async (req, res) => {
    try {
      const newComment = await createNewComment(req.body);

      res.status(201).send({ success: 1, data: newComment });
    } catch (err) {
      console.log(err);
      res.send({ success: 0, message: err.message });
    }
  },
);

commentRouter.get(
  '/findComment/:productId',
  validateRules('findCommentByProductId'),
  validateResults,
  async (req, res) => {
    try {
      let { productId } = req.params;
      let comments = await findCommentByProductId(productId);

      res.status(200).send({ success: 1, data: comments });
    } catch (err) {
      res.send({ success: 0, message: err.message });
    }
  },
);

commentRouter.put(
  '/updateComment/:commentId',
  validateRules('updateComment'),
  validateResults,
  isAuth,
  async (req, res) => {
    try {
      const { commentId } = req.params;

      const updates = req.body;

      const updatedComment = await updateComment({ commentId, updates });

      res.status(200).send({ success: 1, data: updatedComment });
    } catch (err) {
      console.log(err);

      res.send({ success: 0, message: err.message });
    }
  },
);
commentRouter.delete(
  '/deleteComment/:commentId',
  isAuth,
  async (req, res) => {
    try {
      const { commentId } = req.params;

      const deletedComment = await deleteComment(commentId);

      res.send({ success: 1, data: deletedComment });
    } catch (err) {
      console.log(err);

      res.send({ success: 0, message: err.message });
    }
  },
);

module.exports = commentRouter;
