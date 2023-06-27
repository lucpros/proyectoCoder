const express = require('express')
const ProductManager = require('./ProductManager')

const app = express()

app.get('/', (req, res) => {
    return res.send('Home')
})

app.get('/products', async (req, res) => {
    const manager = new ProductManager('./product.json')
    const getAllProducts = await manager.getProducts()

    const num = req.query.limit
    if (!num) {
        return res.send(getAllProducts)
    } else {
        const getLimitProducts = getAllProducts.slice(0, num)
        return res.send(getLimitProducts)
    }
})

app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid)

    const manager = new ProductManager('./product.json')
    const getProductById = await manager.getProductById(productId)
    
    if (!getProductById) {
        return res.send({"Error": `El producto con el ID ${productId} no existe`})
    }
    return res.send(getProductById)
})


app.listen(8080, () => {
    console.log("Servidor Express escuchando en el puerto 8080")
})