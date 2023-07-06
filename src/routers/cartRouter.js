const { Router } = require('express')
const ProductManager = require('../ProductManager')

const cartRouter = Router()
const manager = new CartManager('.././cart.json')


cartRouter.post('/', async (req, res) => {
    const getAllProducts = await manager.getProducts()

    const num = req.query.limit
    if (!num) {
        return res.send(getAllProducts)
    } else {
        const getLimitProducts = getAllProducts.slice(0, num)
        return res.send(getLimitProducts)
    }
})

module.exports = cartRouter