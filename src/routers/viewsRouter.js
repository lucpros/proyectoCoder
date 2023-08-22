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
        const page = req.query.page
        const category = req.query.category || null
        const status = req.query.status || null
        const sort = req.query.sort

        let url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&sort=${sort}`
        
        if (category) {
            url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&category=${category}&sort=${sort}`
        }
        if (status !== null) {
            url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&status=${status}&sort=${sort}`
        }
        if (category & status) {
            url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&category=${category}&status=${status}&sort=${sort}`
        }

        const response = await axios.get(url)

        const products = response.data

        const pageNumber = page !== undefined ? parseInt(page) : 1

        if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > products.totalPages) {
            const message = "El numero de pagina no es valido"
            return res.render('errorView', { message })
        }

        res.render('products', { products })
    } catch (error) {
        console.log(error)
        res.render('products', { error: 'Error al obtener los productos'})
    }
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        const limit = req.query.limit
        const page = req.query.page
        const category = req.query.category || null
        const status = req.query.status || null
        const sort = req.query.sort

        let url = `http://localhost:8080/api/products/realtimeproducts?limit=${limit}&page=${page}&sort=${sort}`
        
        if (category) {
            url = `http://localhost:8080/api/products/realtimeproducts?limit=${limit}&page=${page}&category=${category}&sort=${sort}`
        }
        if (status !== null) {
            url = `http://localhost:8080/api/products/realtimeproducts?limit=${limit}&page=${page}&status=${status}&sort=${sort}`
        }
        if (category & status) {
            url = `http://localhost:8080/api/products/realtimeproducts?limit=${limit}&page=${page}&category=${category}&status=${status}&sort=${sort}`
        }

        const response = await axios.get(url)

        const products = response.data
        const pageNumber = page !== undefined ? parseInt(page) : 1

        if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > products.totalPages) {
            const message = "El numero de pagina no es valido"
            return res.render('errorView', { message })
        }

        res.render('realtimeproducts', { products })
    } catch (error) {
        console.log(error)
        res.render('products', { error: 'Error al obtener los productos'})
    }
})

viewsRouter.get('/cart/:cid', async (req, res) => {
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