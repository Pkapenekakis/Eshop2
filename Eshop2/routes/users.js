const express = require('express');
const User = require('../mongoose/schemas/user.js');


const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req,res) => {
  const { body } = req; //TODO check the req body is valid
});

module.exports = router;
