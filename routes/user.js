const mongoose = require('mongoose');
const auth = require('../middleware/auth')
const express = require('express');
const { User, validate } = require('../model/user');

const router = express.Router();



router.post('/', auth, async (req, res) => {
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

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if(!user) return res.status(404).send('Given id does not exists..!');
  res.send(user);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(404).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id, { 
    fullname: req.body.fullname,
    email: req.body.email,
    contact: req.body.contact}, {
      new: true
    });

    if(!user) return res.status(404).send('Given id does not exists..!');

    res.send(user);
  });

  router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);

    if(!user) return res.status(404).send('Given id does not exists..!');

    res.send(user);
  })

module.exports = router;

