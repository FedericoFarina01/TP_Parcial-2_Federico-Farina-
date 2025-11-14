document.addEventListener('DOMContentLoaded', () => {
  // Obtener compra
  function obtenerCompra() {
    const compra = localStorage.getItem('compra');
    return compra ? JSON.parse(compra) : null;
  }

  // Generar numero de ticket
  function generarNumeroTicket() {
    return Math.floor(Math.random() * 1000000);
  }

  // Formatear fecha
  function formatearFecha(fecha) {
    const opciones = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(fecha).toLocaleDateString('es-AR', opciones);
  }

  // Mostrar ticket
  function mostrarTicket() {
    const compra = obtenerCompra();
    const nombreCliente = localStorage.getItem('nombreCliente');

    if (!compra) {
      alert('No hay datos de compra');
      window.location.href = 'carrito.html';
      return;
    }

    const nombreClienteElemento = document.getElementById('nombre-cliente');
    const numeroTicketElemento = document.getElementById('numero-ticket');
    const fechaElemento = document.getElementById('fecha-ticket');
    const productosElemento = document.getElementById('items-ticket');
    const subtotalElemento = document.getElementById('ticket-subtotal');
    const ivaElemento = document.getElementById('ticket-iva');
    const totalElemento = document.getElementById('ticket-total');

    if (nombreClienteElemento && nombreCliente) {
      nombreClienteElemento.textContent = nombreCliente;
    }

    if (numeroTicketElemento) {
      numeroTicketElemento.textContent = generarNumeroTicket();
    }

    if (fechaElemento) {
      fechaElemento.textContent = formatearFecha(compra.fecha);
    }

    if (productosElemento) {
      let html = '';
      compra.productos.forEach((producto, index) => {
        html += `
            <div class="item-linea">
              <div class="item-nombre fw-semibold">${producto.nombre}</div>
              <div class="item-detalle d-flex justify-content-between align-items-center">
                <span class="text-muted small">(${producto.cantidad} × $${Number(producto.precio).toFixed(2)})</span>
                <span class="fw-bold">$${(producto.precio * producto.cantidad).toFixed(2)}</span>
              </div>
            </div>
            ${index < compra.productos.length - 1 ? '<hr class="item-divisor">' : ''}
          `;
      });
      productosElemento.innerHTML = html;
    }

    if (subtotalElemento) subtotalElemento.textContent = `$${Number(compra.subtotal).toFixed(2)}`;
    if (ivaElemento) ivaElemento.textContent = `$${Number(compra.iva).toFixed(2)}`;
    if (totalElemento) totalElemento.textContent = `$${Number(compra.total).toFixed(2)}`;
  }

  // Administrar boton salir
  function administrarBotonSalir() {
    const botonSalir = document.getElementById('btn-salir');

    if (botonSalir) {
      botonSalir.addEventListener('click', () => {
        const confirmar = confirm('¿Desea salir y volver al inicio?');
        if (confirmar) {
          localStorage.removeItem('carrito');
          localStorage.removeItem('compra');
          window.location.href = 'index.html';
        }
      });
    }
  }

  // Imprimir ticket
  function imprimirTicket() {
    const botonImprimir = document.getElementById('btn-imprimir');

    if (botonImprimir) {
      botonImprimir.addEventListener('click', () => {
        window.print();
      });
    }
  }

  mostrarTicket();
  administrarBotonSalir();
  imprimirTicket();
  descargarPDF();
});
