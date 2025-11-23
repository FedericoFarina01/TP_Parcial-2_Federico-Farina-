// Cambiar estado del producto
document.addEventListener('DOMContentLoaded', function() {
  const botones = document.querySelectorAll('.btn-toggle');
  
  botones.forEach(function(boton) {
    boton.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      const estado = this.getAttribute('data-estado');
      const accion = estado === 'true' ? 'activar' : 'desactivar';
      
      if (confirm('¿Seguro que deseas ' + accion + ' este producto?')) {
        window.location.href = '/admin/productos/toggle/' + id + '/' + estado;
      }
    });
  });
});
