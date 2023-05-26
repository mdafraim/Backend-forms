
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express');
const { Auth } = require('../model/auth');
const Joi = require('joi');
const bcrypt = require('bcrypt');


const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateLogin(req.body);
    if(error) return res.status(400).send('Invalid email or Password');

    let auth = await Auth.findOne({email: req.body.email});
    if(!auth) return res.status(400).send('Invalid email or Password');
 
   const validAuth = await bcrypt.compare(req.body.password, auth.password);
   if(!validAuth) return res.status(400).send('Invalid email or Password');
   
   const token = auth.generateAuthToken();
   res.send(token);
});

function validateLogin(req){
   const schema = {
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required()
   };
   return Joi.validate(req, schema);
}

module.exports = router;