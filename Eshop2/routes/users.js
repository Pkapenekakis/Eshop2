import express from 'express';
import {
  checkSchema,
  validationResult,
  matchedData,
} from "express-validator";
import User from '../mongoose/schemas/user.js'; 
import {createUserValidationSchema} from '../utils/validationSchemas.js';
import { hashPassword } from '../utils/helpers.js';


const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//User registration
router.post('/', checkSchema(createUserValidationSchema) ,async (req,res) => {
  const result = validationResult(req);

  if( !result.isEmpty() ){
    return res.status(400).send(result.array());
  }

  const data = matchedData(req); //Contains the verified fields
  data.password = hashPassword(data.password); //We are doing it sync so await is not needed 
  const newUser = new User(data);
  try {
    const savedUser = await newUser.save() //Save the user 
    return res.status(201).redirect('/index'); //send(savedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
  
});

export default router;
