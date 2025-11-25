exports.mostrarLogin = (req, res) => {
  res.render('login', { title: 'Retro Music - Login Admin' });
};

exports.procesarLogin = (req, res) => {
  res.redirect('/admin/dashboard');
};
