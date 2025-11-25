var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const agregarController = require('../controllers/agregarController');
const editarController = require('../controllers/editarController');
const authController = require('../controllers/authController');
const { validarAgregar } = require('../middleware/validarAgregar');
const { validarEditar } = require('../middleware/validarEditar');
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
router.get('/admin/productos/nuevo', agregarController.mostrarFormulario);
router.post('/admin/productos', upload.single("imagen"), validarAgregar, agregarController.agregarProducto);
router.get('/admin/productos/toggle/:id/:estado', productController.toggleProducto);
router.get('/admin/productos/:id/editar', editarController.mostrarFormulario);
router.post('/admin/productos/:id', upload.single("imagen"), validarEditar, editarController.editarProducto);

module.exports = router;
