const fs = require('fs');
const path = require('path');

// Ruta al archivo de productos
const productosPath = path.join(__dirname, '../../data/productos.json');

// Leer productos del JSON
function leerProductos() {
  const data = fs.readFileSync(productosPath, 'utf-8');
  return JSON.parse(data);
}

//Guardar productos en el JSON
function guardarProductos(productos) {
  fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2));
}

// Mostrar todos los productos en el dashboard
exports.mostrarDashboard = (req, res) => {
  const productos = leerProductos();
  res.render('dashboard', { 
    title: 'Retro Music - Panel Admin',
    productos: productos
  });
};

// Mostrar formulario de agregar producto
exports.mostrarFormularioAgregar = (req, res) => {
  res.render('parciales/agregarProducto', { 
    title: 'Retro Music - Agregar Producto'
  });
};

// Agregar producto
exports.agregarProducto = (req, res) => {
  console.log('POST /admin/productos recibido');
  console.log('Body:', req.body);
  
  try {
    const productos = leerProductos();
    
    console.log('Productos actuales:', productos.length);
    
    // Crear nuevo producto
    const nuevoProducto = {
      id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion || '',
      precio: parseInt(req.body.precio),
      imagen: req.body.imagen,
      categoria: req.body.categoria,
      activo: req.body.activo !== false
    };
    
    console.log('Nuevo producto:', nuevoProducto);
    
    productos.push(nuevoProducto);
    guardarProductos(productos);
    
    console.log('Producto guardado exitosamente');
    
    res.status(201).json({ success: true, producto: nuevoProducto });
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Mostrar formulario de editar producto
exports.mostrarFormularioEditar = (req, res) => {
  const id = parseInt(req.params.id);
  const productos = leerProductos();
  
  // Buscar producto
  const producto = productos.find(p => p.id === id);
  
  if (!producto) {
    return res.redirect('/admin/dashboard');
  }
  
  res.render('parciales/editarProducto', { 
    title: 'Retro Music - Editar Producto',
    producto: producto
  });
};

// Editar un producto existente
exports.editarProducto = (req, res) => {
  const id = parseInt(req.params.id);
  
  try {
    const productos = leerProductos();
    
    const producto = productos.find(p => p.id === id);
    if (!producto) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }
    
    // Actualizar datos
    producto.nombre = req.body.nombre;
    producto.descripcion = req.body.descripcion || '';
    producto.precio = parseInt(req.body.precio);
    producto.categoria = req.body.categoria;
    producto.activo = req.body.activo;
    producto.imagen = req.body.imagen;
    
    guardarProductos(productos);
    
    res.json({ success: true, producto: producto });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Error al actualizar' });
  }
};

// Activar o desactivar un producto
exports.toggleProducto = (req, res) => {
  // Obtener datos de la URL
  const id = parseInt(req.params.id);
  const nuevoEstado = req.params.estado === 'true';
  
  const productos = leerProductos();
  
  // Buscar y modificar el producto
  const producto = productos.find(p => p.id === id);
  if (producto) {
    producto.activo = nuevoEstado;
  }
  
  guardarProductos(productos);
  
  res.redirect('/admin/dashboard');
};
