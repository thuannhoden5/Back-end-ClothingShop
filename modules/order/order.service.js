const cartModel = require('../cart/cart.model');
const userModel = require('../user/user.model');
const orderModel = require('./order.model');

const createNewOrder = async ({ userId, data }) => {
  let { shippingInfo, items, totalPrice } = data;
  cartItems = items.map((item) => {
    return {
      ...item,
      productId: item._id,
    };
  });
  console.log('items', cartItems);

  // create new order
  const order = await orderModel.create({
    buyerDetail: {
      ...shippingInfo,
      userId,
    },
    items: cartItems,
    totalPrice,
  });

  // clear item in cart
  await cartModel.findOneAndUpdate({ userId }, { items: [] });

  // update buyer info
  await userModel.findOneAndUpdate(
    { _id: userId },
    { ...shippingInfo, $addToSet: { order: order._id } },
  );

  return order;
};
const findOrder = async ({ userId, id }) => {
  const foundOrder = await orderModel.findById(id);

  return foundOrder;
};

module.exports = {
  createNewOrder,
  findOrder,
};
