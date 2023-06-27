const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async getProducts () {
        try {
        const productString = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(productString);
        return products;
      } catch (err) {
        return [];
      }
    }
    
    async addProduct(data) {

        if (!data.title 
            || !data.description
            || !data.price
            || !data.thumbnail
            || !data.code
            || !data.stock) {
              console.log("Error: Campos incorrectos")
              return
        }

            try {
              const products = await this.getProducts()
              const codeExist = products.findIndex(product => product.code === data.code)
              
              if(codeExist != -1) {
                  console.log("El código pertenece a otro producto");
                  return
              }

              const product = {
                title: data.title,
                description: data.description,
                price: data.price,
                thumbnail: data.thumbnail,
                code: data.code,
                stock: data.stock
              }
          
              product.id = products.length + 1
              products.push(product)

              await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
              console.log('Producto agregado correctamente', product)
            } catch(e) {
              console.log('Error al guardar el producto', e)
            }
    }

    async getProductById(id) {
      try {
        const products = await this.getProducts();
        const product = products.find((product) => product.id === id);
        if (!product) {
          console.log('No se encuentra producto por ID: ', id);
          return
        }
        console.log('Producto encontrado por ID:', id)
        return product
      } catch (e) {
        console.log('Error: ', e);
        return e;
      }
    }

    async updateProduct (id, data) {
          try {
            const products = await this.getProducts();
            const productIndex = products.findIndex(product => product.id === id)
    
            if (productIndex === -1) {
              console.log('No se encuentra producto a actualizar con ID:', id)
              return
            }

            if (!data.title 
              || !data.description
              || !data.price
              || !data.thumbnail
              || !data.code
              || !data.stock) {
                console.log("Error: Campos incorrectos, no se puede actualizar el producto con ID:", id)
                return
            }
    
            products[productIndex].title = data.title
            products[productIndex].description = data.description
            products[productIndex].price = data.price
            products[productIndex].thumbnail = data.thumbnail
            products[productIndex].code = data.code
            products[productIndex].stock = data.stock
    
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            console.log('Producto actualizado correctamente con ID:', id, data)
          }
          catch (e) {
            console.log('Error al actualizar el producto', e)
          }
      }

      async deleteProduct (id) {
        try {
          const products = await this.getProducts();
          const productIndex = products.findIndex(product => product.id === id)
  
          if (productIndex === -1) {
            console.log('No se encuentra producto a eliminar con ID:', id)
            return
          }

          products.splice(productIndex, 1)
  
          await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
          console.log('Producto eliminado con ID:', id)
        }
        catch (e) {
          console.log('Error al eliminar el producto', e)
        }
    }
}


const body = {
    title: 'Camara de Seguridad',
    description: 'Resolución de 2MP visión nocturna incluida blanca',
    price: 17000,
    thumbnail: '/.camara.png',
    code: 'A6DF8',
    stock: 4
}

const bodyUpdate = {
  title: 'Camara de Seguridad',
  description: 'Resolución de 2MP',
  price: 16000,
  thumbnail: './camara.png',
  code: 'A6DF8',
  stock: 2
}

const body2 = {
  title: 'Joystick inalámbrico',
  description: 'DualSense CFI-ZCT1 white y black',
  price: 48000,
  thumbnail: './joystick.png',
  code: 'SFG8S4',
  stock: 3
}

// const manager = new ProductManager('./product.json');

// (async () => {
//   const getAllProducts = await manager.getProducts();
//   console.log('Todos los productos: ', getAllProducts);

//   await manager.addProduct(body);
//   await manager.addProduct(body2);

//   const newGetAllProducts = await manager.getProducts();
//   console.log('Todos los productos: ', newGetAllProducts);

//   await manager.getProductById(1);

//   await manager.updateProduct(1, bodyUpdate)

//   await manager.deleteProduct(2)
// })();

module.exports = ProductManager;