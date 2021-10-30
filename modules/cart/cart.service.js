const productModel = require('../product/product.model');
const userModel = require('../user/user.model');
const cartModel = require('./cart.model');

const createNewCart = async ({ userId, items }) => {
  const cart = await cartModel.create({ userId, items });

  return cart;
};

const removeItemFromCart = async ({ userId, item }) => {
  const foundCart = await cartModel.findOne({ userId }).lean();

  foundCart.items = foundCart.items.map((cartItem) => {
    if (cartItem.productId === item.productId) {
      return {
        ...cartItem,
        quantity: cartItem.quantity - item.quantity,
        unitPrice: cartItem.unitPrice - item.quantity * item.price,
      };
    } else return { ...cartItem };
  });

  foundCart.items = foundCart.items.filter(
    (cartItem) => cartItem.quantity !== 0,
  );

  await cartModel.findOneAndUpdate({ userId }, { items: foundCart.items });
};

const addItemToCart = async ({ userId, item }) => {
  const foundCart = await cartModel.findOne({ userId }).lean();

  const existingCartItem = checkExistedCartItem(foundCart.items, item);
  if (existingCartItem) {
    foundCart.items = foundCart.items.map((cartItem) => {
      if (cartItem.productId === item.productId) {
        return {
          ...cartItem,
          quantity: cartItem.quantity + item.quantity,
          unitPrice: cartItem.unitPrice + item.quantity * item.price,
        };
      } else return { ...cartItem };
    });
  } else
    foundCart.items.push({ ...item, unitPrice: item.price * item.quantity });

  await cartModel.findOneAndUpdate({ userId }, { items: foundCart.items });
};
const findCartByUserId = async (userId) => {
  const foundCart = await cartModel.findOne({ userId }).lean();

  const totalPrice = foundCart.items.reduce(
    (sum, item) => sum + item.unitPrice,
    0,
  );

  const items = await Promise.all(
    foundCart.items.map(async (item) => {
      const product = await productModel.findOne(
        { _id: item.productId },
        { createdAt: 0, updatedAt: 0, comment: 0 },
      );

      return {
        product,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      };
    }),
  );

  return {
    ...foundCart,
    items,
    id: foundCart._id,
    totalPrice,
  };
};

const checkExistedCartItem = (cartItems, itemWantToCheck) => {
  return cartItems.some(
    (cartItem) => cartItem.productId === itemWantToCheck.productId,
  );
};

module.exports = {
  createNewCart,
  findCartByUserId,
  addItemToCart,
  removeItemFromCart,
};
