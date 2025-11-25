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

exports.mostrarFormulario = (req, res) => {
  res.render('agregarProducto', { 
    title: 'Retro Music - Agregar Producto'
  });
};

exports.agregarProducto = (req, res) => {
  const productos = leerProductos();
  
  const nuevoProducto = {
    id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion || '',
    precio: parseInt(req.body.precio),
    imagen: req.file ? `fotos/${req.file.filename}` : 'fotos/default.jpg',
    categoria: req.body.categoria,
    activo: req.body.activo !== false
  };
  
  productos.push(nuevoProducto);
  guardarProductos(productos);
  
  res.status(201).json({ success: true, producto: nuevoProducto });
};
