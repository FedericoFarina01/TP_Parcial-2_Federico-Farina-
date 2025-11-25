exports.validarEditar = (req, res, next) => {
  const { nombre, precio, categoria } = req.body;
  
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ success: false, error: 'El nombre es obligatorio' });
  }
  
  if (!precio || isNaN(precio) || parseInt(precio) <= 0) {
    return res.status(400).json({ success: false, error: 'El precio debe ser un número positivo' });
  }
  
  if (!categoria || (categoria !== 'vinilos' && categoria !== 'cds')) {
    return res.status(400).json({ success: false, error: 'Categoría inválida' });
  }
  
  next();
};
