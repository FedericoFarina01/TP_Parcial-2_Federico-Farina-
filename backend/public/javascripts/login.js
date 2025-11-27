// Acceso rapido
document.addEventListener('DOMContentLoaded', () => {
  const usuarioInput = document.getElementById('usuario');
  const passwordInput = document.getElementById('password');
  const loginForm = document.querySelector('form[action="/admin/login"]');

  // Buscar el botón de acceso rápido por su texto
  const btnAccesoRapido = Array.from(document.querySelectorAll('a.btn')).find(
    btn => btn.textContent.includes('Acceso Rápido')
  );

  if (btnAccesoRapido) {
    btnAccesoRapido.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Completar el formulario
      usuarioInput.value = 'admin';
      passwordInput.value = 'admin123';
    });
  }
});

