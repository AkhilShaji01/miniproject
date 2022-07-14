var express = require('express');
var router = express.Router();
//var productHelper=require('../helpers/product-helpers')
const customerHelper=require('../helpers/customerHelper')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
