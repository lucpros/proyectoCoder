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
        console.log("obtiene carts: ", carts)

        const cart = {
            id: carts.length + 1,
            products: [],
        }

        carts.push(cart)

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
        return `Cart creado correctamente ${cart}`

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
        console.log(productById);

      } catch (e) {
        console.log('Error: ', e);
        return e;
      }
    }

    async addProductToCart(cartId, productId) {
      try {
        const carts = await this.getCarts();
        const cart = carts.find((cart) => cart.id === cartId);

        if (!cart) {
          console.log('No se encuentra cart por ID: ', cartId);
          return `No se encuentra cart por ID: ${cartId}`
        }

        const product = cart.products.find((item) => item.product === productId)
        
        if(!product) {
          cart.products.push(productId)
          await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
          console.log(`Producto con ID ${productId} agregado al Cart con ID ${cartId}`)
          return `Producto con ID ${productId} agregado al Cart con ID ${cartId}`
        }
        
        const productQuantity = product.quantity += 1
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))+
        console.log(`Producto con ID ${productId} agregado al Cart con ID ${cartId}, cantidad: ${productQuantity}`)
        return `Producto con ID ${productId} agregado al Cart con ID ${cartId}, cantidad: ${productQuantity}`

      } catch (e) {
        console.log('Error: ', e);
        return e;
      }
    }
}
  

const manager = new CartManager('../cart.json');


(async () => {
  // const managerGetCarts = await manager.getCarts();
  // const managerAddCart = await manager.addCart();
  // const managerGetCartById = await manager.getCartById(1);
  const managerAddProductToCart = await manager.addProductToCart(2, 2);
})();