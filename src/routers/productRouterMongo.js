const { Router } = require('express')
const ProductManagerMongo = require('../ProductManagerMongo')
const productsRouterMongo = Router()
const productManagerMongo = new ProductManagerMongo()

productsRouterMongo.get('/', async (req, res) => {
    const getAllProducts = await productManagerMongo.getProducts()
    return res.json(getAllProducts)
})

productsRouterMongo.get('/:pid', async (req, res) => {
    const productId = req.params.pid
    const getProductById = await productManagerMongo.getProductById(productId)
    if (!getProductById) {
        return (`El producto con el ID ${productId} no existe`)
    }
    return res.json(getProductById)
})

productsRouterMongo.post('/', async (req, res) => {
    const data = req.body

    const postProduct = await productManagerMongo.addProduct(data)
    
    if (!data) {
        return "El producto no ha podido agregarse"
    }
    return res.status(201).json(postProduct)
})

productsRouterMongo.put('/:pid', async (req, res) => {
    const productId = req.params.pid
    const data = req.body
    const updateProduct = await productManagerMongo.updateProduct(productId, data)
    if (!data) {
        return `No se puede actualizar el producto con ID ${productId}`
    }
    return res.json(updateProduct)
})

productsRouterMongo.delete('/:pid', async (req, res) => {
    const productId = req.params.pid
    try {
        const deleteProduct = await productManagerMongo.deleteProduct(productId)
        return res.json(deleteProduct)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
})

module.exports = productsRouterMongo