// Submit del formulario de edición
document.getElementById('formEditar').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Obtener el ID del producto desde el data attribute
  const productoId = document.getElementById('formEditar').getAttribute('data-producto-id');

  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const categoria = document.getElementById('categoria').value;
  const precio = parseInt(document.getElementById('precio').value);
  const activo = document.getElementById('activo').checked;
  const imagenFile = document.getElementById('imagen').files[0];
  const imagenActualSrc = document.getElementById('imagenActual').src;
  
  // Extraer solo la ruta relativa de la imagen (ej: ../img/abbey_road.jpg)
  let imagenActual = imagenActualSrc;
  if (imagenActualSrc.includes('/img/')) {
    const nombreImagen = imagenActualSrc.split('/img/')[1];
    imagenActual = `../img/${nombreImagen}`;
  }

  if (!nombre || !categoria || !precio) {
    alert('⚠️ Por favor complete todos los campos obligatorios');
    return;
  }

  const producto = {
    id: parseInt(productoId),
    nombre: nombre,
    descripcion: descripcion || '',
    categoria: categoria,
    precio: precio,
    activo: activo,
    imagen: imagenFile ? `../img/${imagenFile.name}` : imagenActual
  };

  try {
    const response = await fetch(`/admin/productos/${productoId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      alert('✅ Producto actualizado exitosamente!');
      window.location.href = '/admin/dashboard';
    } else {
      alert('❌ Error: ' + (data.error || 'Error desconocido'));
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Error al actualizar el producto');
  }
});
