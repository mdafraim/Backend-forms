const auth = require('../middleware/auth')
const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const { Auth, validate } = require('../model/auth');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const auth = await Auth.findById(req.auth._id).select('-password');
    res.send(auth);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let auth = await Auth.findOne({email: req.body.email});
    if(auth) return res.status(400).send('User Already register');

     auth = new Auth( 
        _.pick(req.body, ['name', 'email', 'password']));

        const salt = await bcrypt.genSalt(10);
        auth.password = await bcrypt.hash(auth.password, salt);

        await auth.save();

        const token = auth.generateAuthToken();
        res.header('x-login-token', token).send(_.pick(auth, ['_id','name', 'email']));
});

module.exports = router;