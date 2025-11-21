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

module.exports = router;
