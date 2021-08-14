const productRouter = require('express').Router();
const {
  createNewProduct,
  findAllProduct,
  findProductById,
  searchProduct,
  updateProduct,
} = require('./product.service');
const { isAdmin, isAuth } = require('../../middlewares/authmiddlewares');

productRouter.post('/createProduct', isAuth, isAdmin, async (req, res) => {
  try {
    const newProduct = await createNewProduct(req.body);

    res.send({ success: 1, data: newProduct });
  } catch (err) {
    res.send({ success: 0, message: err.message });
  }
});

productRouter.get('/findAllProduct', async (req, res) => {
  try {
    let products = await findAllProduct();

    res.send({ success: 1, data: products });
  } catch (err) {
    console.log(err);
    res.send({ success: 0, message: err.message });
  }
});

productRouter.get('/findProduct/:id', async (req, res) => {
  try {
    const { id } = req.params;

    let product = await findProductById(id);

    res.send({ success: 1, data: product });
  } catch (err) {
    console.log(err);
    res.send({ success: 0, message: err.message });
  }
});

productRouter.get('/searchProduct', async (req, res) => {
  try {
    const keywordsearch = req.query;

    let products = await searchProduct(keywordsearch);

    res.send({ success: 1, data: products });
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
      const {productId} = req.params;

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
