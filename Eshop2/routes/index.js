const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pkapenkakis Eshop' });
});

module.exports = router;
