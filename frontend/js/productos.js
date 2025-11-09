document.addEventListener('DOMContentLoaded', async () => {
  const listaVinilos = document.getElementById('lista-vinilos');
  const listaCds = document.getElementById('lista-cds');
  const customerNameDisplay = document.getElementById('customerNameDisplay');

  // Mostrar nombre del cliente
  const customerName = localStorage.getItem('customerName');
  if (customerName) {
    customerNameDisplay.textContent = customerName;
  }

  // Cargar productos desde el JSON
  async function cargarProductos() {
    try {
      const response = await fetch('../../data/productos.json');
      if (!response.ok) {
        throw new Error('Error al cargar productos');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      alert('No se pudieron cargar los productos');
      return [];
    }
  }

  // Mostrar productos en la página
  function mostrarProductos(productos) {
    // Filtrar por categoría
    const vinilos = productos.filter((p) => p.categoria === 'vinilos' && p.activo);
    const cds = productos.filter((p) => p.categoria === 'cds' && p.activo);

    // Mostrar vinilos
    listaVinilos.innerHTML = '';
    vinilos.forEach((producto) => {
      listaVinilos.innerHTML += crearTarjetaProducto(producto);
    });

    // Mostrar CDs
    listaCds.innerHTML = '';
    cds.forEach((producto) => {
      listaCds.innerHTML += crearTarjetaProducto(producto);
    });
  }

  // Crear HTML de la tarjeta de producto
  function crearTarjetaProducto(producto) {
    return `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" 
               style="height: 250px; object-fit: cover;"
               onerror="this.src='../img/vinilo.png'">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="text-primary fw-bold">$${producto.precio.toLocaleString()}</p>
            
            <div class="d-flex gap-2 align-items-center">
              <button class="btn btn-sm btn-outline-danger">-</button>
              <span class="badge bg-secondary">0</span>
              <button class="btn btn-sm btn-outline-success">+</button>
              <button class="btn btn-sm btn-primary flex-grow-1">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Inicializar
  const productos = await cargarProductos();
  mostrarProductos(productos);
});
