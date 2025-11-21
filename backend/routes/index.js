var express = require('express');
var router = express.Router();

/* GET admin login page */
router.get('/admin', function(req, res, next) {
  res.render('login', { title: 'Retro Music - Login Admin' });
});

router.get('/admin/login', function(req, res, next) {
  res.render('login', { title: 'Retro Music - Login Admin' });
});

/* GET admin dashboard */
router.get('/admin/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Retro Music - Panel Admin' });
});

module.exports = router;
