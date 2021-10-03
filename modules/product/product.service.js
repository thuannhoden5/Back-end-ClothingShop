const commentModel = require('../comment/comment.model');
const productModel = require('./product.model');

const createNewProduct = async (productInfo) => {
  const product = await productModel.create(productInfo);

  return product;
};

const findProductById = async (productId) => {
  const foundProduct = await productModel.findById(productId).lean();

  if (!foundProduct) {
    throw new Error('Do not have these product in store');
  }

  return {
    ...foundProduct,
    comments: await commentModel.find({ _id: { $in: foundProduct.comments } }),
  };
};

const findAllProductByFilter = async (productFilter) => {
  const mongoDbFilter = {
    category:
      productFilter.category.length > 0
        ? { $in: productFilter.category }
        : { $in: ['shirt', 'paint', 'accessory'] },
    price: {
      $gt: productFilter.fromPrice ? Number(productFilter.fromPrice) : 0,
      $lt: productFilter.toPrice ? Number(productFilter.toPrice) : 20000000,
    },
  };
  const foundProducts = await productModel.find(mongoDbFilter).lean();

  if (!foundProducts) {
    throw new Error('Do not have these product in store');
  }

  return foundProducts;
};

const updateProduct = async ({ productId, updates }) => {
  const foundProduct = await productModel.findById(productId);

  if (!foundProduct) throw new Error('Profile is not found');

  const fields = Object.keys(updates);

  fields.forEach((field) => {
    foundProduct[field] = updates[field];
  });

  await foundProduct.save();

  return foundProduct;
};

module.exports = {
  createNewProduct,
  updateProduct,
  findAllProductByFilter,
  findProductById,
};
