// Preview imagen
document.addEventListener('DOMContentLoaded', () => {
  console.log('Script agregarProductos.js cargado');
  
  const imagenInput = document.getElementById('imagen');
  const preview = document.getElementById('preview');
  const previewImg = document.getElementById('previewImg');
  const form = document.getElementById('formProducto');
  

  if (imagenInput) {
    imagenInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      
      if (file) {
        // Validar tamaño max 2MB
        if (file.size > 2 * 1024 * 1024) {
          alert('⚠️ La imagen es muy pesada. Tamaño máximo: 2MB');
          imagenInput.value = '';
          preview.style.display = 'none';
          return;
        }

        // Mostrar preview
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
  const modal = document.getElementById('modalAgregarProducto');
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
    console.log('Agregando event listener al form');
    form.addEventListener('submit', async (e) => {
      console.log('Submit event detectado!');
      e.preventDefault();

      // Obtener valores del form
      const nombre = document.getElementById('nombre').value.trim();
      const descripcion = document.getElementById('descripcion').value.trim();
      const categoria = document.getElementById('categoria').value;
      const precio = parseInt(document.getElementById('precio').value);
      const activoCheckbox = document.getElementById('activo');
      const activo = activoCheckbox ? activoCheckbox.checked : true;
      const imagenFile = document.getElementById('imagen').files[0];

      // Validar campos 
      if (!nombre || !categoria || !precio) {
        alert('⚠️ Por favor complete todos los campos obligatorios');
        return;
      }

      const nuevoProducto = {
        nombre: nombre,
        descripcion: descripcion || '',
        categoria: categoria,
        precio: precio,
        activo: activo,
        imagen: imagenFile ? `../img/${imagenFile.name}` : '../img/default.jpg'
      };

      try {

        const response = await fetch('/admin/productos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevoProducto)
        });

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        if (response.ok && data.success) {
          alert('✅ Producto agregado exitosamente!');
        
          const modalElement = document.getElementById('modalAgregarProducto');
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();
          // Recargar pagina
          setTimeout(() => window.location.reload(), 500);
        } else {
          alert('❌ Error al agregar el producto: ' + (data.error || 'Error desconocido'));
        }
      } catch (error) {
        console.error('Error:', error);
        alert('❌ Error al agregar el producto: ' + error.message);
      }
    });
  }
});
