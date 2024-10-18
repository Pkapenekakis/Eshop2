import express from 'express';
import {
  checkSchema,
  validationResult,
  matchedData,
} from "express-validator";
import User from '../mongoose/schemas/user.js'; 
import {createUserValidationSchema} from '../utils/validationSchemas.js';


const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', checkSchema(createUserValidationSchema) ,async (req,res) => {
  const result = validationResult(req);

  if( !result.isEmpty() ){
    return res.status(400).send(result.array());
  }

  const data = matchedData(req);
  const newUser = new User(data);
  try {
    const savedUser = await newUser.save() //async method
    return res.status(201).send(savedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
  
});

export default router;
