const { Router } = require('express')
const CartManagerMongo = require('../CartManagerMongo')

const cartRouterMongo = Router()
const cartManagerMongo = new CartManagerMongo()


cartRouterMongo.get('/', async (req, res) => {
    try{
        const getAllCarts = await cartManagerMongo.getCarts()
        return res.json(getAllCarts)
    } catch (error) {
        return error
    }
})

cartRouterMongo.post('/', async (req, res) => {
    try {
        const addCart = await cartManagerMongo.addCart()
        return addCart
    } catch (error) {
        return error
    }
})

cartRouterMongo.get('/:cid', async (req, res) => {
    try{
        const cartId = req.params.cid
        const getCart = await cartManagerMongo.getCartById(cartId)
        return getCart
    } catch (error) {
        return error
    }
})

cartRouterMongo.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid)
    
        const addProductToCart = await manager.addProductToCart(cartId, productId)
        return res.send(addProductToCart)
    } catch (error) {
        return error
    }
})

module.exports = cartRouterMongo