const { Router } = require('express')
const CartManager = require('../dao/CartManager')

const cartRouter = Router()
const cartManager = new CartManager()


cartRouter.get('/', async (req, res) => {
    try{
        const getAllCarts = await cartManager.getCarts()
        return res.json(getAllCarts)
    } catch (error) {
        return error
    }
})

cartRouter.post('/', async (req, res) => {
    try {
        const addCart = await cartManager.addCart()
        return res.send(addCart)
    } catch (error) {
        return error
    }
})

cartRouter.get('/:cid', async (req, res) => {
    try{
        const cartId = req.params.cid
        const getCart = await cartManager.getCartById(cartId)
        return res.send(getCart)
    } catch (error) {
        return error
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
    
        const addProductToCart = await cartManager.addProductToCart(cartId, productId)
        return res.send(addProductToCart)
    } catch (error) {
        return error
    }
})

module.exports = cartRouter