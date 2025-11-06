// temas.js

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Verificar si el usuario tenía un tema guardado
const temaGuardado = localStorage.getItem('tema');

if (temaGuardado === 'oscuro') {
  body.classList.add('tema-oscuro');
  themeToggle.textContent = '☀️';
}

// Escuchar el click para cambiar el tema
themeToggle.addEventListener('click', () => {
  body.classList.toggle('tema-oscuro');

  if (body.classList.contains('tema-oscuro')) {
    themeToggle.textContent = '☀️';
    localStorage.setItem('tema', 'oscuro');
  } else {
    themeToggle.textContent = '🌙';
    localStorage.setItem('tema', 'claro');
  }
});
