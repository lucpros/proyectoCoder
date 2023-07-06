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

module.exports = cartRouter