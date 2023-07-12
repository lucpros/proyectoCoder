const express = require('express')
const axios = require('axios')
const viewsRouter = express.Router()

viewsRouter.get('/', async (req, res) => {
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

module.exports = viewsRouter