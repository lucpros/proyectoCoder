const mongoose = require('mongoose')

const cartsSchema = mongoose.Schema({
    products: [{
        product: Number,
        quantity: Number
      }
    ]
})

module.exports = mongoose.model('carts', cartsSchema)