const orderRouter = require('express').Router();
const { isAuth } = require('../../middlewares/authmiddlewares');
const {
  validateRules,
  validateResults,
} = require('../../middlewares/validation-middlewares');
const { createNewOrder, findOrder } = require('./order.service');

orderRouter.post(
  '/createOrder',
  validateRules('createOrder'),
  validateResults,
  isAuth,
  async (req, res) => {
    try {
      const userId = req.user._id;

      const { items } = req.body;

      const newOrder = await createNewOrder({ userId, items });

      console.log(newOrder);

      res.status(201).send({ sucess: 1, data: newOrder });
    } catch (err) {
      console.log(err);
      res.send({ success: 0, message: err.message });
    }
  },
);

orderRouter.get('/findOrder/:id', isAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    const foundOrder = await findOrder({ userId, id });

    res.status(200).send({ sucess: 1, data: foundOrder });
  } catch (err) {
    console.log(err);
    res.send({ success: 0, message: err.message });
  }
});

module.exports = orderRouter;
