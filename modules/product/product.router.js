const productRouter = require('express').Router();
const {
  createNewProduct,
  findAllProductByFilter,
  updateProduct,
  findProductById,
} = require('./product.service');
const { isAdmin, isAuth } = require('../../middlewares/authmiddlewares');
const {
  validateRules,
  validateResults,
} = require('../../middlewares/validation-middlewares');

productRouter.post(
  '/createProduct',
  validateRules('createNewProduct'),
  validateResults,
  isAuth,
  isAdmin,
  async (req, res) => {
    try {
      const newProduct = await createNewProduct(req.body);

      res.status(201).send({ success: 1, data: newProduct });
    } catch (err) {
      res.send({ success: 0, message: err.message });
    }
  },
);

productRouter.get(
  '/findAllProductByFilter/',
  validateRules('findAllProductByFilter'),
  validateResults,
  async (req, res) => {
    try {
      let productFilter = req.query;
      let products = await findAllProductByFilter(productFilter);

      res.status(200).send({ success: 1, data: products });
    } catch (err) {
      console.log(err);
      res.send({ success: 0, message: err.message });
    }
  },
);

productRouter.get('/findProduct/:id', async (req, res) => {
  try {
    const { id } = req.params;

    let product = await findProductById(id);

    res.status(200).send({ success: 1, data: product });
  } catch (err) {
    console.log(err);
    res.send({ success: 0, message: err.message });
  }
});

productRouter.put(
  '/updateProductDetail/:productId',
  isAuth,
  isAdmin,
  async (req, res) => {
    try {
      const { productId } = req.params;

      const updates = req.body;

      const updatedProduct = await updateProduct({ productId, updates });

      res.send({ success: 1, data: updatedProduct });
    } catch (err) {
      console.log(err);

      res.send({ success: 0, message: err.message });
    }
  },
);

module.exports = productRouter;
