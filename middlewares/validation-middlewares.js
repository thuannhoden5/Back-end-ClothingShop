const { body, query, validationResult, param } = require('express-validator');

const validateRules = (method) => {
  switch (method) {
    case 'register': {
      return [
        body('email', 'Invalid email').isEmail(),
        body('password', 'Password must be at least 6 character').isLength({
          min: 6,
        }),
        body('phoneNumber', 'Phone number must be valid phone number')
          .optional()
          .isMobilePhone(),
        body('role', 'role must be buyers or admin').isIn(['buyers', 'admin']),
      ];
    }
    case 'login': {
      return [
        body('email', 'Invalid email').isEmail(),
        body('password', 'Please enter password').notEmpty(),
      ];
    }
    case 'createNewProduct': {
      return [
        body('title', 'Please give a title for product').notEmpty(),
        body('image', 'New product must have image').notEmpty(),
        body('category', 'Category must be shirt or paint or accessory').isIn([
          'shirt',
          'paint',
          'accessory',
        ]),
        body('category', 'Please add category for product').notEmpty(),
      ];
    }
    case 'findAllProductByFilter': {
      return [
        query('category', 'Category must be shirt or paint or accessory').isIn([
          'shirt',
          'paint',
          'accessory',
        ]),
        query('category', 'Category must be array').isArray(),
      ];
    }
    case 'createOrUpdateCart': {
      return [body('items', 'Items in cart must be array').isArray()];
    }
    case 'createOrder': {
      return [body('items', 'Items in cart must be array').isArray()];
    }
    case 'createComment': {
      return [body('content', 'Comment must have content').notEmpty()];
    }
    case 'findCommentByProductId': {
      return [param('productId', 'Must have product id').notEmpty()];
    }
    case 'updateComment': {
      return [
        body('content', 'Must have content to update').notEmpty(),
        param('commentId', 'Must have comment id im param').notEmpty(),
      ];
    }
  }
};
const validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = {};
  errors.array().map((err) => (extractedErrors[err.param] = err.msg));

  return res.send({
    success: 0,
    message: extractedErrors,
  });
};
module.exports = { validateRules, validateResults };
