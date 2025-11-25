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
  const id = parseInt(req.params.id);
  const productos = leerProductos();
  const producto = productos.find(p => p.id === id);
  
  if (!producto) {
    return res.redirect('/admin/dashboard');
  }
  
  res.render('editarProducto', { 
    title: 'Retro Music - Editar Producto',
    producto: producto
  });
};

exports.editarProducto = (req, res) => {
  const id = parseInt(req.params.id);
  
  try {
    const productos = leerProductos();
    const producto = productos.find(p => p.id === id);
    
    if (!producto) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }
    
    producto.nombre = req.body.nombre;
    producto.descripcion = req.body.descripcion || '';
    producto.precio = parseInt(req.body.precio);
    producto.categoria = req.body.categoria;
    producto.activo = req.body.activo;
    
    if (req.file) {
      producto.imagen = `fotos/${req.file.filename}`;
    }
    
    guardarProductos(productos);
    
    res.json({ success: true, producto: producto });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al actualizar' });
  }
};
