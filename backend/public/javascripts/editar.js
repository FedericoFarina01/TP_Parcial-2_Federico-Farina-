document.getElementById('formEditar').addEventListener('submit', async (e) => {
  e.preventDefault();

  const productoId = document.getElementById('formEditar').getAttribute('data-producto-id');

  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const categoria = document.getElementById('categoria').value;
  const precio = parseInt(document.getElementById('precio').value);
  const activo = document.getElementById('activo').checked;
  const imagenFile = document.getElementById('imagen').files[0];

  if (!nombre || !categoria || !precio) {
    alert('⚠️ Por favor complete todos los campos obligatorios');
    return;
  }

  const formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('descripcion', descripcion || '');
  formData.append('categoria', categoria);
  formData.append('precio', precio);
  formData.append('activo', activo);
  
  if (imagenFile) {
    formData.append('imagen', imagenFile);
  }

  try {
    const { data } = await axios.post(`/admin/productos/${productoId}`, formData);

    if (data.success) {
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
