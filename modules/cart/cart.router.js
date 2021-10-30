const cartRouter = require('express').Router();
const { isAuth } = require('../../middlewares/authmiddlewares');
const {
  validateRules,
  validateResults,
} = require('../../middlewares/validation-middlewares');
const cartModel = require('./cart.model');
const {
  createNewCart,
  addItemToCart,
  findCartByUserId,
  removeItemFromCart,
} = require('./cart.service');

cartRouter.post('/createCart', isAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const { items } = req.body;

    const newCart = createNewCart({ userId, items });

    res.status(201).send({ success: 1, data: newCart });
  } catch (err) {
    console.log(err);
    res.send({ success: 0, message: err.message });
  }
});

cartRouter.post('/addItemToCart', isAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    console.log(userId);

    const { item } = req.body;

    await addItemToCart({ userId, item });

    return res.send({ success: 1 });
  } catch (err) {
    console.log(err);
    res.send({ success: 0, message: err.message });
  }
});

cartRouter.post('/removeItemFromCart', isAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    console.log(userId);

    const { item } = req.body;

    await removeItemFromCart({ userId, item });

    return res.send({ success: 1 });
  } catch (err) {
    console.log(err);
    res.send({ success: 0, message: err.message });
  }
});

cartRouter.get('/findCart', isAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const foundCart = await findCartByUserId(userId);

    console.log(foundCart);

    res.status(200).send({ success: 1, data: foundCart });
  } catch (err) {
    console.log(err);
    res.send({ success: 0, message: err.message });
  }
});

module.exports = cartRouter;
