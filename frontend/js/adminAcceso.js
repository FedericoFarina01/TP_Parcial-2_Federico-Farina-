let contadorCero = 0;
let temporizador;

document.addEventListener('keydown', (e) => {
  if (e.key === '0') {
    contadorCero++;

    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
      contadorCero = 0;
    }, 2000);

    if (contadorCero === 5) {
      const adminLink = document.getElementById('admin-link');
      if (adminLink) {
        // Toggle: activar o desactivar
        const estaActivo = localStorage.getItem('adminAccess') === 'true';

        if (estaActivo) {
          // Desactivar
          adminLink.style.display = 'none';
          localStorage.setItem('adminAccess', 'false');
        } else {
          // Activar
          adminLink.style.display = 'block';
          localStorage.setItem('adminAccess', 'true');
        }
      }
      contadorCero = 0;
    }
  }
});

window.addEventListener('load', () => {
  if (localStorage.getItem('adminAccess') === 'true') {
    const adminLink = document.getElementById('admin-link');
    if (adminLink) {
      adminLink.style.display = 'block';
    }
  }
});
