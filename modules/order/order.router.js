const orderRouter = require('express').Router();
const { isAuth } = require('../../middlewares/authmiddlewares');
const {
  validateRules,
  validateResults,
} = require('../../middlewares/validation-middlewares');
const { createNewOrder, findOrderByUserId } = require('./order.service');

orderRouter.post(
  '/createOrUpdateorder',
  validateRules('createOrder'),
  validateResults,
  isAuth,
  async (req, res) => {
    try {
      const userId = req.user._id;

      const { product } = req.body;

      const newOrder = createNewOrder({ userId, product });

      res.status(201).send({ sucess: 1, data: newOrder });
    } catch (err) {
      console.log(err);
      res.send({ success: 0, message: err.message });
    }
  },
);

orderRouter.get('/findOrder', isAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const foundOrder = await findOrderByUserId(userId);

    res.status(200).send({ sucess: 1, data: foundOrder });
  } catch (err) {
    console.log(err);
    res.send({ success: 0, message: err.message });
  }
});

module.exports = orderRouter;
