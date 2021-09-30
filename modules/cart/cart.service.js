const productModel = require('../product/product.model');
const userModel = require('../user/user.model');
const cartModel = require('./cart.model');

const createNewCart = async ({ userId, product }) => {
  const cart = await cartModel.create({ user: userId, product });

  return cart;
};

const updateCart = async ({ userId, items }) => {
  const cartItems = await Promise.all(
    items.map(async (item) => {
      console.log('item here', item);
      const product = await productModel.findOne(
        { _id: item.productId },
        { _id: 0 },
      );

      const unitPrice = item.quantity * product.price;

      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice,
      };
    }),
  );
  const foundCart = await cartModel.findOne({ user: userId });

  foundCart.items = cartItems;

  await foundCart.save();

  return foundCart;
};
const findCartByUserId = async (userId) => {
  const foundCart = await cartModel.findOne({ user: userId });

  const items = await Promise.all(
    foundCart.items.map(async (item) => {
      const product = await productModel.findOne(
        { _id: item.productId },
        { _id: 0, createdAt: 0, updatedAt: 0, comment: 0 },
      );

      return {
        product,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      };
    }),
  );

  return {
    id: foundCart._id,
    userId,
    items,
  };
};

module.exports = {
  createNewCart,
  findCartByUserId,
  updateCart,
};
