// Preview imagen
document.addEventListener('DOMContentLoaded', () => {
  const imagenInput = document.getElementById('imagen');
  const preview = document.getElementById('preview');
  const previewImg = document.getElementById('previewImg');
  const form = document.getElementById('formProducto');
  const modal = document.getElementById('modalAgregarProducto');

  if (imagenInput) {
    imagenInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          alert('⚠️ La imagen es muy pesada. Tamaño máximo: 2MB');
          imagenInput.value = '';
          preview.style.display = 'none';
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
          previewImg.src = event.target.result;
          preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        preview.style.display = 'none';
      }
    });
  }

  // Limpiar form al cerrar
  if (modal) {
    modal.addEventListener('hidden.bs.modal', () => {
      if (form) {
        form.reset();
        preview.style.display = 'none';
      }
    });
  }

  // Submit formulario
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

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
        const { data } = await axios.post('/admin/productos', formData);

        if (data.success) {
          alert('✅ Producto agregado exitosamente!');
          window.location.href = '/admin/dashboard';
        } else {
          alert('❌ Error: ' + (data.error || 'Error desconocido'));
        }
      } catch (error) {
        console.error('Error:', error);
        alert('❌ Error al agregar el producto');
      }
    });
  }
});
