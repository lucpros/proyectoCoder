const socket = io()

socket.on('nuevoProducto', (data) => {
  console.log('Nuevo cliente conectado. POST')
  const product = JSON.parse(data)

  const productHTML = `
  <tr>
      <td>${product.id}</td>
      <td>${product.title}</td>
      <td>${product.price}</td>
      <td>${product.stock}</td>
      <td>${product.category}</td>
  </tr>
  `

  const table = document.getElementById('productos')

  table.innerHTML += productHTML

})