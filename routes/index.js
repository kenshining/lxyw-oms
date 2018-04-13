var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/main', function(req, res, next) {
  res.render('main', { title: 'Express' });
});

router.get('/print-model/form', function(req, res, next) {
  res.render('print-model/sale_list', { title: 'Express' });
});

module.exports = router;
