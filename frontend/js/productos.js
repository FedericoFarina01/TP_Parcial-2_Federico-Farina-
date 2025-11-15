document.addEventListener('DOMContentLoaded', async () => {
  const listaVinilos = document.getElementById('lista-vinilos');
  const listaCds = document.getElementById('lista-cds');
  const nombreClienteElemento = document.getElementById('customerNameDisplay');
  const contadorCarrito = document.getElementById('cart-count');

  let productosCache = [];

  // Mostrar nombre del cliente
  const nombreCliente = localStorage.getItem('nombreCliente');
  if (nombreCliente) {
    nombreClienteElemento.textContent = nombreCliente;
  }

  // Cargar productos desde el JSON
  async function cargarProductos() {
    try {
      const respuesta = await fetch('../../data/productos.json');
      if (!respuesta.ok) throw new Error('Error al cargar productos');
      return await respuesta.json();
    } catch (error) {
      console.error('Error:', error);
      alert('No se pudieron cargar los productos');
      return [];
    }
  }

  // Mostrar productos en la página
  function mostrarProductos(productos) {
    const vinilos = productos.filter((p) => p.categoria === 'vinilos' && p.activo);
    const cds = productos.filter((p) => p.categoria === 'cds' && p.activo);

    listaVinilos.innerHTML = vinilos.map(crearTarjetaProducto).join('');
    listaCds.innerHTML = cds.map(crearTarjetaProducto).join('');

    actualizarContadorCarrito();
  }

  // Crear la tarjeta de producto
  function crearTarjetaProducto(producto) {
    const carrito = obtenerCarrito();
    const productoEnCarrito = carrito.find((p) => p.id === producto.id);
    const estaEnCarrito = productoEnCarrito !== undefined;
    const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.cantidad : 0;

    return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
      <div class="card" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p class="text-primary fw-bold">$${producto.precio.toLocaleString()}</p>

          ${estaEnCarrito ? `<p class="text-success small mb-2">En carrito: ${cantidadEnCarrito}</p>` : ''}

          <div class="d-flex gap-2">
            ${
              estaEnCarrito
                ? `<button class="btn btn-sm btn-danger w-100 btn-eliminar" data-id="${producto.id}">
                     🗑️ Eliminar del carrito
                   </button>`
                : `<button class="btn btn-sm btn-primary w-100 btn-agregar" data-id="${producto.id}">
                     ➕ Agregar al carrito
                   </button>`
            }
          </div>
        </div>
      </div>
    </div>
  `;
  }

  // Obtener y guardar carrito
  function obtenerCarrito() {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }

  function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // Actualizar contador del carrito
  function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const total = carrito.reduce((suma, producto) => suma + producto.cantidad, 0);
    if (contadorCarrito) contadorCarrito.textContent = total > 0 ? `(${total})` : '';
  }

  // Detectar click en botones
  document.addEventListener('click', (evento) => {
    const boton = evento.target;

    // Agregar al carrito
    if (boton.classList.contains('btn-agregar')) {
      const idProducto = Number(boton.dataset.id);
      const producto = productosCache.find((p) => p.id === idProducto);
      if (!producto) return;

      const carrito = obtenerCarrito();
      const productoEnCarrito = carrito.find((p) => p.id === idProducto);

      if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
      } else {
        carrito.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad: 1,
        });
      }

      guardarCarrito(carrito);
      mostrarProductos(productosCache);
      alert(`"${producto.nombre}" agregado al carrito`);
    }

    // Eliminar del carrito
    if (boton.classList.contains('btn-eliminar')) {
      const idProducto = Number(boton.dataset.id);
      const producto = productosCache.find((p) => p.id === idProducto);
      if (!producto) return;

      if (confirm(`¿Deseas eliminar "${producto.nombre}" del carrito?`)) {
        const carrito = obtenerCarrito();
        const carritoActualizado = carrito.filter((p) => p.id !== idProducto);
        guardarCarrito(carritoActualizado);
        mostrarProductos(productosCache);
        alert(`"${producto.nombre}" eliminado del carrito`);
      }
    }
  });

  productosCache = await cargarProductos();
  mostrarProductos(productosCache);
});
