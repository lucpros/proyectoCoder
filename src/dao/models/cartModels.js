const mongoose = require('mongoose')

const cartsSchema = mongoose.Schema({
    products: [{
        product: String,
        quantity: Number
      }
    ]
})

// Populate
// const cartsSchema = mongoose.Schema({
//   products: [{
//     product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' }, // Cambio aquí
//     quantity: Number
//   }]
// })

module.exports = mongoose.model('carts', cartsSchema)