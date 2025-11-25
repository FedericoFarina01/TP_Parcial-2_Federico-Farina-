const fs = require('fs');
const path = require('path');

const productosPath = path.join(__dirname, '../../data/productos.json');

function leerProductos() {
  const data = fs.readFileSync(productosPath, 'utf-8');
  return JSON.parse(data);
}

function guardarProductos(productos) {
  fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2));
}

exports.mostrarDashboard = (req, res) => {
  const productos = leerProductos();
  res.render('dashboard', { 
    title: 'Retro Music - Panel Admin',
    productos: productos
  });
};

exports.toggleProducto = (req, res) => {
  const id = parseInt(req.params.id);
  const nuevoEstado = req.params.estado === 'true';
  
  const productos = leerProductos();
  const producto = productos.find(p => p.id === id);
  
  if (producto) {
    producto.activo = nuevoEstado;
    guardarProductos(productos);
  }
  
  res.redirect('/admin/dashboard');
};
