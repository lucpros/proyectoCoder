const express = require('express')
const viewsRouter = require('./routers/viewsRouter')

const productsRouter = require('./routers/productRouter')
const cartRouter = require('./routers/cartRouter')
const sessionRouter = require('./routers/sessionRouter')

const mongoose = require('mongoose')
const handlebars = require('express-handlebars')

const socketServer = require('./utils/io')

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

const MONGODB_CONNECT = 'mongodb+srv://gordon_free3:GreciasenEgal789@cluster0.nfgcx.gcp.mongodb.net/ecommerce?retryWrites=true&w=majority'
mongoose.connect(MONGODB_CONNECT)
.then(()=>console.log('conexion DB'))
.catch((error) => console.log(error))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const PORT = 8080
const httpServer = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto: ${PORT}`))

const io = socketServer(httpServer)

app.use('/', viewsRouter)

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/api/session', sessionRouter)
