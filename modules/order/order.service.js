const cartModel = require('./order.model');

const createNewCart = async ({ userId, product }) => {
  const cart = await cartModel.create({ user: userId, product });

  return cart;
};

const updateCart = async ({ userId, product }) => {
  const foundCart = await cartModel.findOne({ user: userId });

  foundCart.product = product;

  await foundCart.save();

  return foundCart;
};
const findCartByUserId = async (userId) => {
  console.log(userId);

  const foundCart = await cartModel
    .findOne({ user: userId })
    .populate('user', { email: 1, name: 1 })
    .populate('product', { title: 1, image: 1, price: 1 });

  return foundCart;
};

module.exports = {
  createNewCart,
  findCartByUserId,
  updateCart,
};
