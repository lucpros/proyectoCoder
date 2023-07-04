const { Router } = require('express')
const ProductManager = require('../ProductManager')

const productRouter = Router()
const manager = new ProductManager('.././product.json')


productRouter.get('/', async (req, res) => {
    const getAllProducts = await manager.getProducts()

    const num = req.query.limit
    if (!num) {
        return res.send(getAllProducts)
    } else {
        const getLimitProducts = getAllProducts.slice(0, num)
        return res.send(getLimitProducts)
    }
})

productRouter.get('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid)

    const getProductById = await manager.getProductById(productId)
    
    if (!getProductById) {
        return res.send({"Error": `El producto con el ID ${productId} no existe`})
    }
    return res.send(getProductById)
})

productRouter.post('/', async (req, res) => {

    const data = req.body
    console.log(data)

    const postProduct = await manager.addProduct(data)
    
    if (!data) {
        return res.send({"Error": "El producto no ha podido agregarse"})
    }
    return res.status(201).json(postProduct)
})

productRouter.put('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid) 
    const data = req.body

    const updateProduct = await manager.updateProduct(productId, data)
    
    if (!data) {
        return res.send({"Error": `No se puede actualizar el producto con ID ${productId}`})
    }
    return res.json(updateProduct)
})

productRouter.delete('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid)

    const deleteProduct = await manager.deleteProduct(productId)
    
    if (!deleteProduct) {
        return res.send({"Error": `No se puede eliminar el producto con ID ${productId}`})
    }
    return res.status(204).json({})
})

module.exports = productRouter