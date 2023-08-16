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
viewsRouter.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit
        const page = req.query.limit
        const category = req.query.category
        const status = req.query.status
        
        const response = await axios.get(
            `http://localhost:8080/api/products?limit=${limit}page=${page}category=${category}status=${status}`)
        const products = response.data
        //products.docs = products.docs.map(product => product.toObject())

        res.render('products', { products })
    } catch (error) {
        console.log(error)
        res.render('products', { error: 'Error al obtener los productos'})
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