// temas.js

const botonTema = document.getElementById('themeToggle');
const cuerpo = document.body;

// Verificar si el usuario tenía un tema guardado
const temaGuardado = localStorage.getItem('tema');

if (temaGuardado === 'oscuro') {
  cuerpo.classList.add('tema-oscuro');
  botonTema.textContent = '☀️';
}

// Escuchar el click para cambiar el tema
botonTema.addEventListener('click', () => {
  cuerpo.classList.toggle('tema-oscuro');

  if (cuerpo.classList.contains('tema-oscuro')) {
    botonTema.textContent = '☀️';
    localStorage.setItem('tema', 'oscuro');
  } else {
    botonTema.textContent = '🌙';
    localStorage.setItem('tema', 'claro');
  }
});
