const { Router } = require('express')
const CartManager = require('../CartManager')

const cartRouter = Router()
const manager = new CartManager('.././cart.json')


cartRouter.get('/', async (req, res) => {
    try{
        const getAllCarts = await manager.getCarts()
        return res.send(getAllCarts)
    } catch (error) {
        return error
    }
})

cartRouter.post('/', async (req, res) => {
    try {
        const addCart = await manager.addCart()
        return res.send(addCart)
    } catch (error) {
        return error
    }
})

cartRouter.get('/:cid', async (req, res) => {
    try{
        const cartId = parseInt(req.params.cid)
        const getCart = await manager.getCartById(cartId)
        return res.send(getCart)
    } catch (error) {
        return error
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid)
    
        const addProductToCart = await manager.addProductToCart(cartId, productId)
        return res.send(addProductToCart)
    } catch (error) {
        return error
    }
})

module.exports = cartRouter