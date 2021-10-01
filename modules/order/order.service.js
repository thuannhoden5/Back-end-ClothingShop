const orderModel = require('./order.model');

const createNewOrder = async ({ userId, items }) => {
  let totalPrice = 0;

  items.forEach((item) => {
    totalPrice += item.unitPrice;
  });
  const order = await orderModel.create({ userId, items, totalPrice });

  return order;
};
const findOrder = async ({ userId, id }) => {
  const foundOrder = await orderModel.find({ userId, _id: id });

  return foundOrder;
};

module.exports = {
  createNewOrder,
  findOrder,
};
