const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const { User, validate } = require('../model/user');

const router = express.Router();



router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if( error ) return res.status(404).send(error.details[0].message);

  let user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    contact: req.body.contact
  });
  user = await user.save();
  res.send(user);
});

router.get('/', async (req, res) => {
    const user = await User.find().sort({ name: 1})
    res.send(user);
});

module.exports = router;

