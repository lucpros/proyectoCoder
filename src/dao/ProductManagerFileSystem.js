const fs = require('fs')

class ProductManagerFileSystem {
    constructor(path, io) {
        this.path = path
        this.io = io
    }

    async getProducts () {
        try {
        const productString = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(productString);
        return products;
      } catch (err) {
        return `No se encontraron productos, ${err}`;
      }
    }
    
    async addProduct(data) {

        if (!data.title 
            || !data.description
            || !data.price
            || !data.thumbnail
            || !data.code
            || !data.stock
            || !data.status
            || !data.category) {
              console.log("Error: Campos incorrectos")
              return "Error: Campos incorrectos"
        }

            try {
              const products = await this.getProducts()
              const codeExist = products.findIndex(product => product.code === data.code)
              
              if(codeExist != -1) {
                  console.log("El código pertenece a otro producto");
                  return "El código pertenece a otro producto"
              }

              const product = {
                title: data.title,
                description: data.description,
                price: data.price,
                thumbnail: data.thumbnail,
                code: data.code,
                stock: data.stock,
                status: data.status,
                category: data.category
              }
          
              product.id = products.length + 1
              products.push(product)

              await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
              this.io.emit('nuevoProducto', JSON.stringify(product))

              console.log('Producto agregado correctamente', product)
              return "Producto agregado correctamente"
            } catch(e) {
              console.log('Error al guardar el producto', e)
              return `Error al guardar el producto, ${e}`
            }
    }

    async getProductById(id) {
      console.log("id de producto en manager producto",id)
      let notProduct = false

      try {
        const products = await this.getProducts();
        console.log(typeof(products))
        const product = products.find((product) => product.id === id);
        if (!product) {
          console.log('No se encuentra producto por ID: ', id);
          return notProduct
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
              return `No se encuentra producto a actualizar con ID: ${id}`
            }

            if (!data.title 
              || !data.description
              || !data.price
              || !data.thumbnail
              || !data.code
              || !data.stock
              || !data.status
              || !data.category) {
                console.log("Error: Campos incorrectos, no se puede actualizar el producto con ID:", id)
                return `Error: Campos incorrectos, no se puede actualizar el producto con ID: ${id}`
            }
    
            products[productIndex].title = data.title
            products[productIndex].description = data.description
            products[productIndex].price = data.price
            products[productIndex].code = data.code
            products[productIndex].thumbnail = data.thumbnail
            products[productIndex].stock = data.stock
            products[productIndex].status = data.status
            products[productIndex].category = data.category
    
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
            console.log('Producto actualizado correctamente con ID:', id, data)
            return `Producto actualizado correctamente con ID: ${id}`
          }
          catch (e) {
            console.log('Error al actualizar el producto', e)
            return `Error al actualizar el producto: ${e}`
          }
      }

      async deleteProduct (id) {
        try {
          const products = await this.getProducts();
          const productIndex = products.findIndex(product => product.id === id)
  
          if (productIndex === -1) {
            console.log('No se encuentra producto a eliminar con ID:', id)
            return `No se encuentra producto a eliminar con ID: ${id}`
          }

          products.splice(productIndex, 1)
  
          await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
          this.io.emit('eliminarProducto', id.toString());
          console.log('Producto eliminado con ID:', id)
          return `Producto eliminado con ID: ${id}`
        }
        catch (e) {
          console.log('Error al eliminar el producto', e)
          return `Error al eliminar el producto: ${e}`
        }
    }
}

module.exports = ProductManagerFileSystem;