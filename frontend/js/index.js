document.addEventListener('DOMContentLoaded', () => {
  // Administrar formulario de nombre
  function administrarFormularioNombre() {
    const inputNombre = document.getElementById('nombre-Cliente');
    const btnContinuar = document.getElementById('btn-continuar');

    inputNombre.addEventListener('input', function () {
      validarNombre(this, btnContinuar);
    });

    btnContinuar.addEventListener('click', () => {
      guardarYContinuar(inputNombre);
    });
  }

  // Validar nombre
  function validarNombre(input, boton) {
    const nombre = input.value.trim();
    boton.disabled = nombre.length < 2;

    if (nombre.length >= 2) {
      boton.classList.add('enabled');
    } else {
      boton.classList.remove('enabled');
    }
  }

  // Guardar y continuar
  function guardarYContinuar(input) {
    const nombre = input.value.trim();
    if (nombre.length >= 2) {
      localStorage.setItem('nombreCliente', nombre);
      window.location.href = 'productos.html';
    }
  }

  administrarFormularioNombre();
});
