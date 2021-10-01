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

      const { items } = req.body;

      const foundCart = await findCartByUserId(userId);

      if (foundCart) {
        const cartReturn = await updateCart({ userId, items });

        return res.send({ success: 1, data: cartReturn });
      }
      const newCart = createNewCart({ userId, items });

      res.status(201).send({ sucess: 1, data: newCart });
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

    console.log(foundCart);

    res.status(200).send({ sucess: 1, data: foundCart });
  } catch (err) {
    console.log(err);
    res.send({ success: 0, message: err.message });
  }
});

module.exports = cartRouter;
