const express = require('express')

const productRouter = require('./routers/productRouter')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    return res.send('Home')
})

app.use('/api/products', productRouter)


app.listen(8080, () => {
    console.log("Servidor Express escuchando en el puerto 8080")
})