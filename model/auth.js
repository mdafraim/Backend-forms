const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');


const authSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    isAdmin: Boolean
});

authSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const Auth = mongoose.model('Auth', authSchema);

function authValidate(auth){
    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(auth, schema);
}

exports.Auth = Auth;
exports.authSchema = authSchema;
exports.validate = authValidate;