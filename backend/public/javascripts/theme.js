// Modo oscuro
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Cargar tema guardado
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('tema-oscuro');
    if (themeToggle) themeToggle.textContent = '☀️';
  }

  // Toggle tema
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('tema-oscuro');
      
      if (body.classList.contains('tema-oscuro')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
      } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
      }
    });
  }
});
