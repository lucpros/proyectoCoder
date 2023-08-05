const express = require('express')
const axios = require('axios')
const viewsRouter = express.Router()

// FILE SYSTEM
viewsRouter.get('/homeFileSystem', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/api/productsFileSystem')
        const products = response.data

        res.render('home', { products })
    } catch (error) {
        console.log(error)
        res.render('home', { error: 'Error al obtener los productos'})
    }
})

viewsRouter.get('/realtimeproductsFileSystem', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/api/productsFileSystem')
        const products = response.data

        res.render('realTimeProducts', { products })
    } catch (error) {
        console.log(error)
        res.render('realTimeProducts', { error: 'Error al obtener los productos'})
    }
})

viewsRouter.get('/cartFileSystem/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const response = await axios.get(`http://localhost:8080/api/cartsFileSystem/${cartId}`)
        const cart = response.data
        console.log(cart)

        res.render('carts', { cart })
    } catch (error) {
        console.log(error)
        res.render('carts', { error: 'Error al obtener los productos'})
    }
})

// MONGODB
viewsRouter.get('/home', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/api/products')
        const products = response.data

        res.render('home', { products })
    } catch (error) {
        console.log(error)
        res.render('home', { error: 'Error al obtener los productos'})
    }
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/api/products')
        const products = response.data

        res.render('realTimeProducts', { products })
    } catch (error) {
        console.log(error)
        res.render('realTimeProducts', { error: 'Error al obtener los productos'})
    }
})

viewsRouter.get('/cartFile/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const response = await axios.get(`http://localhost:8080/api/carts/${cartId}`)
        const cart = response.data
        console.log(cart)

        res.render('carts', { cart })
    } catch (error) {
        console.log(error)
        res.render('carts', { error: 'Error al obtener los productos'})
    }
})

module.exports = viewsRouter