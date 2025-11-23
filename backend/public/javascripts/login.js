// Acceso rapido
document.addEventListener('DOMContentLoaded', () => {
  const btnAccesoRapido = document.getElementById('btnAccesoRapido');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginForm = document.getElementById('loginForm');

  if (btnAccesoRapido) {
    btnAccesoRapido.addEventListener('click', () => {
      emailInput.value = 'admin@retromusic.com';
      passwordInput.value = 'admin123';
      emailInput.focus();
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      // Credenciales demo
      const ADMIN_EMAIL = 'admin@retromusic.com';
      const ADMIN_PASSWORD = 'admin123';

      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Login ok
        window.location.href = '/admin/dashboard';
      } else {
        // Error login
        alert('Credenciales incorrectas. Intente nuevamente.');
        passwordInput.value = '';
        passwordInput.focus();
      }
    });
  }
});

