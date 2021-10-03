const commentModel = require('./comment.model');
const productModel = require('../product/product.model');

const createNewComment = async (commentInfo) => {
  const newComment = await commentModel.create(commentInfo);

  const product = await productModel.findById(commentInfo.productId);

  product.comments = product.comments.concat(newComment._id);

  product.save();

  return newComment;
};

const findCommentByProductId = async (productId) => {
  const foundComments = await commentModel.find({ productId }).lean();

  return foundComments;
};

const updateComment = async ({ commentId, updates }) => {
  const foundComment = await commentModel.findById(commentId);

  if (!foundComment) throw new Error('Comment is not found');

  const fields = Object.keys(updates);

  fields.forEach((field) => {
    foundComment[field] = updates[field];
  });

  await foundComment.save();

  return foundComment;
};

const deleteComment = async (commentId) => {
  const deletedComment = await commentModel.findByIdAndDelete(commentId);

  return deletedComment;
};

module.exports = {
  createNewComment,
  updateComment,
  findCommentByProductId,
  deleteComment,
};
