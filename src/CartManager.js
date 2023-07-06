const fs = require('fs')
const ProductManager = require('./ProductManager')

const managerProducts = new ProductManager('../product.json')

class CartManager {
    constructor(path) {
        this.path = path
    }

    async getCarts () {
        try {
        const cartString = await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(cartString);
        return carts;
      } catch (err) {
        return `No se encontraron productos, ${err}`;
      }
    }

    async addCart() {
      try {
        const carts = await this.getCarts()

        const cart = {
            id: carts.length + 1,
            products: [],
        }

        carts.push(cart)

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))

        const cartJson = JSON.stringify(cart)
        return `Cart creado correctamente: ${cartJson}`

      } catch(error) {
          return `Error al crear el cart, ${error}`
      }
    }

    async getCartById(id) {
      try {
        const carts = await this.getCarts();
        const cart = carts.find((cart) => cart.id === id);

        if (!cart) {
          console.log('No se encuentra cart por ID: ', id);
          return `No se encuentra cart por ID: ${id}`
        }

        const productPromises = cart.products.map( async (product) => {

          const productId = product.product
          console.log(`Productos encontrados del Cart con ID ${id}: ${productId}`)

          const productDetails = await managerProducts.getProductById(productId);

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
        const carts = await this.getCarts();
        const cart = carts.find((cart) => cart.id === cartId);
        const productExist = await managerProducts.getProductById(productId)

        if (!cart) {
          return `No se encuentra cart por ID: ${cartId}`
        }

        if (!productExist) {
          return `No se puede agregar el producto con ID: ${productId}, no existe`
        }

        const product = cart.products.find((item) => item.product === productId)
        
        if(!product) {

          cart.products.push({
            product: productId, 
            quantity: 1}
          )

          await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
          return `Producto con ID ${productId} agregado al Cart con ID ${cartId}`
        }
        
        const productQuantity = product.quantity += 1
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
        return `Producto con ID ${productId} agregado al Cart con ID ${cartId}, cantidad: ${productQuantity} `

      } catch (e) {
        console.log('Error: ', e);
        return e;
      }
    }
}
  

// const manager = new CartManager('../cart.json');


// (async () => {
//   // const managerGetCarts = await manager.getCarts();
//   // const managerAddCart = await manager.addCart();
//   const managerGetCartById = await manager.getCartById(1);
//   //const managerAddProductToCart = await manager.addProductToCart(1, 2);
// })();

module.exports = CartManager