const productModel = require("./product.model")

const createNewProduct = async (productInfo) => {
    const product = await productModel.create(productInfo)

    return product
}

const findAllProduct = async () => {
    const foundProducts = await productModel.find().lean()

    return foundProducts

}
const findProductById = async (productId) => {
    const foundProduct = await productModel.findById(productId).lean()

    if (!foundProduct) {
        throw new Error('Do not have these product in store')
    }

    return foundProduct

}

const searchProduct = async (query) => {
    const foundProducts = await productModel.find(query)

    if (!foundProducts) {
        throw new Error('Do not have any product')
    }

    return foundProducts
}

const updateProduct = async ({ productId, updates }) => {
    const foundProduct = await productModel.findById(productId)

    if (!foundProduct) throw new Error("Profile is not found")

    const fields = Object.keys(updates)

    fields.forEach((field) => {
        foundProduct[field] = updates[field]
    })

    await foundProduct.save()

    return foundProduct
}

module.exports = {
    createNewProduct,
    findAllProduct,
    updateProduct,
    findProductById,
    searchProduct,
}