const cartModel = require('./models/cartModels')
const ProductManager = require('./ProductManager')

const productManager = new ProductManager()

class CartManager {
    constructor() {
        this.model = cartModel
    }

    async getCarts () {
        try {
            const carts = this.model.find()
            return carts
        } catch (err) {
            return `No se encontro cart, ${err}`
        }
    }

    async addCart() {
        try {
          return this.model.create({
            products: []
          })
        } catch(error) {
            return `Error al crear el cart, ${error}`
        }
    }

    async getCartById(id) {
        try {
          const cart = await this.model.findById(id)
  
          if (!cart) {
            console.log('No se encuentra cart por ID: ', id);
            return `No se encuentra cart por ID: ${id}`
          }
  
          const productPromises = cart.products.map( async (product) => {
  
            const productId = product.product
            console.log(`Productos encontrados del Cart con ID ${id}: ${productId}`)
  
            const productDetails = await productManager.getProductById(productId);
  
            return { product: productDetails, quantity: product.quantity };
          })
  
          const productById = await Promise.all(productPromises);
  
          const cartJson = JSON.stringify(productById)
          return cartJson
  
        } catch (e) {
          console.log('Error: ', e);
          return e;
        }
    }

    async addProductToCart(cartId, productId) {
      try {
        const cart = await this.model.findById(cartId);
        const productExist = await productManager.getProductById(productId)
        
        if (!cart) {
          return `No se encuentra cart por ID: ${cartId}`
        }

        if (!productExist) {
          return "No se agrego producto al cart porque no existe"

        } else {
          const product = cart.products.find((item) => item.product === productId)

          if(!product) {
            await this.model.updateOne({ _id: cartId }, { $push: { products: [{product: productId, quantity: 1}] }})
            return `Producto con ID ${productId} agregado al Cart con ID ${cartId}`
          }

          await this.model.updateOne(
            { _id: cartId, 'products.product': productId },
            { $inc: { 'products.$.quantity': 1 } }
          )
          return "producto agregado al Cart"
          }

      } catch (e) {
        console.log('Error: ', e);
        return e;
      }
    }
}

module.exports = CartManager