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

cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
    
        const deleteProductFromCart = await cartManager.deleteProductFromCart(cartId, productId)
        return res.send(deleteProductFromCart)
    } catch (error) {
        return error
    }
})

cartRouter.put('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const data = req.body
        const updateCart = await cartManager.updateCart(cartId, data)
        if (!data) {
            return `No se puede actualizar el cart con ID ${cartId}`
        }
        return res.json(updateCart)

    } catch (error) {
        return error
    }
})

cartRouter.put('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productsId = req.params.pid
        const data = req.body
    
        const updateQuantityProducts = await cartManager.updateQuantityProducts(cartId, productsId, data)
        if (!data) {
            return `No se puede actualizar cantidad de productos con ID ${productsId} en el cart con ID ${cartId}`
        }
        return res.json(updateQuantityProducts)

    } catch (error) {
        return error
    }
})

cartRouter.delete('/:cid', async (req, res) => {
    const cartId = req.params.cid
    try {
        const cleanCart = await cartManager.cleanCart(cartId)
        return res.json(cleanCart)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
})

module.exports = cartRouter