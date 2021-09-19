const cartRouter = require('express').Router();
const { isAuth } = require('../../middlewares/authmiddlewares');
const {
  validateRules,
  validateResults,
} = require('../../middlewares/validation-middlewares');
const cartModel = require('./cart.model');
const {
  createNewCart,
  updateCart,
  findCartByUserId,
} = require('./cart.service');

cartRouter.post(
  '/createOrUpdateCart',
  validateRules('createOrUpdateCart'),
  validateResults,
  isAuth,
  async (req, res) => {
    try {
      const userId = req.user._id;

      const { product } = req.body;

      const foundCart = await findCart(userId);

      if (foundCart) {
        const cartReturn = await updateCart({ userId, product });

        res.send({ success: 1, data: cartReturn });
      }
      const newCart = createNewCart({ userId, product });

      res.send({ sucess: 1, data: newCart });
    } catch (err) {
      console.log(err);
      res.send({ success: 0, message: err.message });
    }
  },
);

cartRouter.get('/findCart', isAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const foundCart = await findCartByUserId(userId);

    res.send({ sucess: 1, data: foundCart });
  } catch (err) {
    console.log(err);
    res.send({ success: 0, message: err.message });
  }
});

module.exports = cartRouter;
