import express from 'express';
import {
  checkSchema
} from "express-validator";
import User from '../mongoose/schemas/user.js'; 
import {createUserValidationSchema} from '../utils/validationSchemas.js';


const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', checkSchema(createUserValidationSchema) ,async (req,res) => {
  const { body } = req; //TODO check the req body is valid
  const newUser = new User(body);
  try {
    const savedUser = await newUser.save() //async method
    return res.status(201).send(savedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
  
});

export default router;
