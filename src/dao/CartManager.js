const cartModel = require('./models/cartModels')
const ProductManager = require('./ProductManager')
const producSchema = require('./models/productModels')
const mongoose = require('mongoose')

const productManager = new ProductManager()

class CartManager {
    constructor() {
        this.model = cartModel
    }

    async getCarts () {
        try {
            const carts = this.model.find().populate('products.product')
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
          const cart = await this.model.findById(id).populate('products.product')
  
          if (!cart) {
            console.log('No se encuentra cart por ID: ', id);
            return `No se encuentra cart por ID: ${id}`
          }
        
          return cart
  
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
          console.log(product)

          if(!product) {
            await this.model.updateOne({ _id: cartId }, { $push: { products: [{product: productId, quantity: 1}] }})
            console.log(`Producto con ID ${productId} agregado al Cart con ID ${cartId}`)
            return `Producto con ID ${productId} agregado al Cart con ID ${cartId}`
          }

          const postMongoose = await this.model.updateOne(
            { _id: cartId, 'products.product': productId },
            { $inc: { 'products.$.quantity': 1 } }
          )
          console.log(postMongoose)
          console.log("producto agregado al Cart")
          return "producto agregado al Cart"
          }

      } catch (e) {
        console.log('Error: ', e);
        return e;
      }
    }

    async deleteProductFromCart(cartId, productId) {
      try {
        const cart = await this.model.findById(cartId).populate('products.product')
        const productExist = await productManager.getProductById(productId)

        if (!cart) {
          return `No se encuentra cart por ID: ${cartId}`
        }

        if (!productExist) {
          return "No se agrego producto al cart porque no existe"
        }
        
        const productInCart = cart.products.find(item => item.product._id.equals(productId));

        if(!productInCart) {
          return `El producto con ID ${productId} no se encuentra en el Cart con ID ${cartId}`
        }

        const productObjectId = productInCart._id

        const updatedCart = await this.model.updateOne(
          { _id: cartId },
          { $pull: { products: { _id: productObjectId } }},
        )

        console.log('Producto eliminado exitosamente del carrito');
        return "producto eliminado del Cart"

      } catch (e) {
        console.log('Error, no se ha eliminado el producto del cart: ', e);
        return e;
      }
    }

    async updateCart (id, data) {
      try {
        const cart = await this.getCartById(id)

        if (!cart) {
          console.log('No se encuentra cart a actualizar con ID:', id)
          return `No se encuentra cart a actualizar con ID: ${id}`
        }

        const cartUpdated = {
          _id: cart._id,
          products: data.products
        }

        await this.model.updateOne({ _id: id}, cartUpdated)
        console.log('Cart actualizado correctamente con ID:', id, data)
        return cartUpdated
      }
      catch (e) {
        console.log('Error al actualizar el cart', e)
        return `Error al actualizar el cart: ${e}`
      }
    }

    async updateQuantityProducts (cartId, data) {
      try {
        const cart = await this.getCartById(cartId)
        console.log(data)

        if (!cart) {
          console.log('No se encuentra cart a actualizar con ID:', id)
          return `No se encuentra cart a actualizar con ID: ${id}`
        }

        const productToUpdate = cart.products.find(
          (product) => product.product === data.products[0].product
        )

        if (!productToUpdate) {
          console.log('No se encuentra el producto en el carrito');
          return 'No se encuentra el producto en el carrito';
        }

        const quantityUpdated = {
          _id: cart._id,
          products: [
            {
              product: cart.products.product,
              quantity: data.products.quantity,
              _id: cart.products._id
            }
          ]
        }

        await this.model.updateOne({ _id: id}, quantityUpdated)
        console.log('Cart actualizado correctamente con ID:', id, data)
        return quantityUpdated
      }
      catch (e) {
        console.log('Error al actualizar el cart', e)
        return `Error al actualizar el cart: ${e}`
      }
    }

    async cleanCart (cartId) {
      try {
        const cart = await this.getCartById(cartId)

        if (!cart) {
          console.log('No se encuentra cart a actualizar con ID:', id)
          return `No se encuentra cart a actualizar con ID: ${id}`
        }

        const cartUpdated = {
          _id: cart._id,
          products: []
        }

        await this.model.updateOne({ _id: id}, cartUpdated)
        console.log('Cart actualizado correctamente con ID:', id, data)
        return cartUpdated
      }
      catch (e) {
        console.log('Error al actualizar el cart', e)
        return `Error al actualizar el cart: ${e}`
      }
    }
}

module.exports = CartManager