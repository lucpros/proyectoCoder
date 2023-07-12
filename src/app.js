const express = require('express')
const handlebars = require('express-handlebars')
const socketServer = require('./utils/io')

const viewsRouter = require('./routers/viewsRouter')

const productRouter = require('./routers/productRouter')
const cartRouter = require('./routers/cartRouter')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('public'))

const PORT = 8080
const httpServer = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto: ${PORT}`))

const io = socketServer(httpServer)

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    // socket.on('message', data => {
    //     console.log(data)
    // })
})

app.use('/api/products', productRouter)
app.use('/', viewsRouter)
app.use('/api/carts', cartRouter)

// app.listen(8080, () => {
//     console.log("Servidor Express escuchando en el puerto 8080")
// })