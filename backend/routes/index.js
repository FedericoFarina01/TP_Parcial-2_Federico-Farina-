var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET admin login page */
router.get('/admin', function(req, res, next) {
  res.render('login', { title: 'Retro Music - Login Admin' });
});

router.get('/admin/login', function(req, res, next) {
  res.render('login', { title: 'Retro Music - Login Admin' });
});

/* GET admin dashboard */
router.get('/admin/dashboard', function(req, res, next) {
  // Leer productos del JSON
  const productosPath = path.join(__dirname, '../../data/productos.json');
  const productosData = fs.readFileSync(productosPath, 'utf-8');
  const productos = JSON.parse(productosData);
  
  res.render('dashboard', { 
    title: 'Retro Music - Panel Admin',
    productos: productos
  });
});

/* POST agregar producto */
router.post('/admin/productos', function(req, res, next) {
  console.log('POST /admin/productos recibido');
  console.log('Body:', req.body);
  
  try {
    const productosPath = path.join(__dirname, '../../data/productos.json');
    
    // Leer productos actuales
    const productosData = fs.readFileSync(productosPath, 'utf-8');
    const productos = JSON.parse(productosData);
    
    console.log('Productos actuales:', productos.length);
    
    // Crear nuevo producto con ID
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
    
    // Agregar a la lista
    productos.push(nuevoProducto);
    
    // Guardar en el JSON
    fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2));
    
    console.log('Producto guardado exitosamente');
    
    res.status(201).json({ success: true, producto: nuevoProducto });
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
