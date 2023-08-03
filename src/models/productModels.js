const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: {
        type: String,
        unique: true
    },
    stock: Number,
    status: String,
    category: String
})

module.exports = mongoose.model('products', productsSchema)