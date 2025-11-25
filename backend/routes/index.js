var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: "public/fotos/",
  })
});

router.get('/admin', authController.mostrarLogin);
router.get('/admin/login', authController.mostrarLogin);
router.post('/admin/login', authController.procesarLogin);

router.get('/admin/dashboard', productController.mostrarDashboard);
router.get('/admin/productos/nuevo', productController.mostrarFormularioAgregar);
router.post('/admin/productos', upload.single("imagen"), productController.agregarProducto);
router.get('/admin/productos/toggle/:id/:estado', productController.toggleProducto);
router.get('/admin/productos/:id/editar', productController.mostrarFormularioEditar);
router.post('/admin/productos/:id', upload.single("imagen"), productController.editarProducto);

module.exports = router;
