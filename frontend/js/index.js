// Validación del nombre
const inputNombre = document.getElementById('nombre-Cliente');
const btnContinuar = document.getElementById('btn-continuar');

inputNombre.addEventListener('input', function() {
    const nombre = this.value.trim();
    btnContinuar.disabled = nombre.length < 2;

    if (nombre.length >= 2) {
        btnContinuar.classList.add('enabled');
    } else {
        btnContinuar.classList.remove('enabled');
    }
});

// Continuar al catálogo
btnContinuar.addEventListener('click', function() {
    const nombre = inputNombre.value.trim();
    if (nombre.length >= 2) {
        // Guardar nombre en localStorage
        localStorage.setItem('customerName', nombre);

        // Redirigir a productos
        window.location.href = 'productos.html';
    }
});

