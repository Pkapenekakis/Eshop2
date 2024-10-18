import express from 'express';
import { Passport } from 'passport';
import Strategy from 'passport-local';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pkapenkakis Eshop' });
});

export default router;
