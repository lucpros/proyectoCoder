const { Router } = require('express')
const ProductManager = require('../dao/ProductManager')
const productsRouter = Router()
const productManager = new ProductManager()

productsRouter.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 3
        const page = parseInt(req.query.page) || 1
        const getAllProducts = await productManager.getProducts(limit, page)
        return res.json(getAllProducts)
    } catch(error) {
        return res.json("Error", error)
    }
})

productsRouter.get('/:pid', async (req, res) => {
    const productId = req.params.pid
    const getProductById = await productManager.getProductById(productId)
    if (!getProductById) {
        return (`El producto con el ID ${productId} no existe`)
    }
    return res.json(getProductById)
})

productsRouter.post('/', async (req, res) => {
    const data = req.body

    const postProduct = await productManager.addProduct(data)
    
    if (!data) {
        return "El producto no ha podido agregarse"
    }
    return res.status(201).json(postProduct)
})

productsRouter.put('/:pid', async (req, res) => {
    const productId = req.params.pid
    const data = req.body
    const updateProduct = await productManager.updateProduct(productId, data)
    if (!data) {
        return `No se puede actualizar el producto con ID ${productId}`
    }
    return res.json(updateProduct)
})

productsRouter.delete('/:pid', async (req, res) => {
    const productId = req.params.pid
    try {
        const deleteProduct = await productManager.deleteProduct(productId)
        return res.json(deleteProduct)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
})

module.exports = productsRouter