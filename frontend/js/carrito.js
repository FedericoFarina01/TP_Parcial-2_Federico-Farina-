document.addEventListener('DOMContentLoaded', () => {
  const itemsCarrito = document.getElementById('items-carrito');
  const subtotalElemento = document.getElementById('subtotal');
  const ivaElemento = document.getElementById('iva');
  const totalElemento = document.getElementById('total');
  const btnFinalizar = document.getElementById('btn-finalizar');
  const contadorCarrito = document.getElementById('cartCount');

  // Obtener carrito del localStorage
  function obtenerCarrito() {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }

  // Guardar carrito en localStorage
  function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // Mostrar productos del carrito
  function mostrarCarrito() {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
      itemsCarrito.innerHTML = '<p class="text-center text-muted">Tu carrito está vacío.</p>';
      btnFinalizar.disabled = true;
      actualizarResumen(0, 0, 0);
      return;
    }

    btnFinalizar.disabled = false;
    let html = '';

    carrito.forEach((producto) => {
      html += `
        <div class="item-carrito mb-3 p-3 border rounded">
          <div class="row align-items-center">
            <div class="col-md-2">
              <img src="${producto.imagen}" alt="${producto.nombre}" 
                   class="img-fluid rounded" 
                   style="max-height: 80px; object-fit: cover;"
                   onerror="this.src='../img/vinilo.png'">
            </div>
            <div class="col-md-4">
              <h5 class="mb-1">${producto.nombre}</h5>
              <p class="text-muted mb-0">$${producto.precio.toLocaleString()}</p>
            </div>
            <div class="col-md-3">
              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-outline-danger btn-restar-carrito" data-id="${producto.id}">-</button>
                <span class="badge bg-secondary">${producto.cantidad}</span>
                <button class="btn btn-sm btn-outline-success btn-sumar-carrito" data-id="${producto.id}">+</button>
              </div>
            </div>
            <div class="col-md-2">
              <p class="mb-0 fw-bold">$${(producto.precio * producto.cantidad).toLocaleString()}</p>
            </div>
            <div class="col-md-1">
              <button class="btn btn-sm btn-danger btn-eliminar-carrito" data-id="${producto.id}">🗑️</button>
            </div>
          </div>
        </div>
      `;
    });

    itemsCarrito.innerHTML = html;
    agregarEventListeners();
    calcularTotales();
  }

  // Calcular totales
  function calcularTotales() {
    const carrito = obtenerCarrito();
    const subtotal = carrito.reduce(
      (total, item) => total + Number(item.precio) * Number(item.cantidad),
      0
    );
    const iva = subtotal * 0.21;
    const total = subtotal + iva;

    actualizarResumen(subtotal, iva, total);
  }

  // Actualizar resumen
  function actualizarResumen(subtotal, iva, total) {
    if (subtotalElemento) subtotalElemento.textContent = `$${subtotal.toLocaleString()}`;
    if (ivaElemento) ivaElemento.textContent = `$${iva.toLocaleString()}`;
    if (totalElemento) totalElemento.textContent = `$${total.toLocaleString()}`;
  }

  // Actualizar contador del carrito
  function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    if (contadorCarrito) {
      contadorCarrito.textContent = totalItems > 0 ? `(${totalItems})` : '';
    }
  }

  // Agregar event listeners a los botones
  function agregarEventListeners() {
    // Botones sumar cantidad
    const botonesSumar = document.querySelectorAll('.btn-sumar-carrito');
    botonesSumar.forEach((boton) => {
      boton.addEventListener('click', () => {
        const idProducto = Number(boton.getAttribute('data-id'));
        const carrito = obtenerCarrito();
        const producto = carrito.find((p) => p.id === idProducto);

        if (producto) {
          producto.cantidad += 1;
          guardarCarrito(carrito);
          mostrarCarrito();
          actualizarContadorCarrito();
        }
      });
    });

    // Botones restar cantidad
    const botonesRestar = document.querySelectorAll('.btn-restar-carrito');
    botonesRestar.forEach((boton) => {
      boton.addEventListener('click', () => {
        const idProducto = Number(boton.getAttribute('data-id'));
        const carrito = obtenerCarrito();
        const producto = carrito.find((p) => p.id === idProducto);

        if (producto) {
          if (producto.cantidad > 1) {
            producto.cantidad -= 1;
            guardarCarrito(carrito);
            mostrarCarrito();
            actualizarContadorCarrito();
          } else {
            if (confirm('¿Deseas eliminar este producto del carrito?')) {
              const carritoActualizado = carrito.filter((p) => p.id !== idProducto);
              guardarCarrito(carritoActualizado);
              mostrarCarrito();
              actualizarContadorCarrito();
            }
          }
        }
      });
    });

    // Botones eliminar producto
    const botonesEliminar = document.querySelectorAll('.btn-eliminar-carrito');
    botonesEliminar.forEach((boton) => {
      boton.addEventListener('click', () => {
        const idProducto = Number(boton.getAttribute('data-id'));
        if (confirm('¿Deseas eliminar este producto del carrito?')) {
          const carrito = obtenerCarrito();
          const carritoActualizado = carrito.filter((p) => p.id !== idProducto);
          guardarCarrito(carritoActualizado);
          mostrarCarrito();
          actualizarContadorCarrito();
        }
      });
    });
  }

  // Finalizar compra
  if (btnFinalizar) {
    btnFinalizar.addEventListener('click', () => {
      const carrito = obtenerCarrito();
      if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
      }

      console.log('Carrito:', carrito);

      // Guardar datos de la compra para el ticket
      const subtotal = carrito.reduce(
        (total, item) => total + Number(item.precio) * Number(item.cantidad),
        0
      );
      const iva = subtotal * 0.21;
      const total = subtotal + iva;

      console.log('Subtotal:', subtotal);
      console.log('IVA:', iva);
      console.log('Total:', total);

      localStorage.setItem(
        'compra',
        JSON.stringify({
          productos: carrito,
          subtotal: subtotal,
          iva: iva,
          total: total,
          fecha: new Date().toISOString(),
        })
      );

      // Redirigir a la página de ticket
      window.location.href = 'ticket.html';
    });
  }

  // Inicializar
  mostrarCarrito();
  actualizarContadorCarrito();
});
