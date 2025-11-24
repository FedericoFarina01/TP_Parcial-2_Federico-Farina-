var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

/* GET admin login page */
router.get('/admin', function(req, res, next) {
  res.render('login', { title: 'Retro Music - Login Admin' });
});

router.get('/admin/login', function(req, res, next) {
  res.render('login', { title: 'Retro Music - Login Admin' });
});

/* Rutas de productos */
router.get('/admin/dashboard', productController.mostrarDashboard);
router.get('/admin/productos/nuevo', productController.mostrarFormularioAgregar);
router.post('/admin/productos', productController.agregarProducto);
router.get('/admin/productos/toggle/:id/:estado', productController.toggleProducto);
router.get('/admin/productos/:id/editar', productController.mostrarFormularioEditar);
router.post('/admin/productos/:id', productController.editarProducto);

module.exports = router;
