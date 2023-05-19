const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minlength: 5,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);


function valdationUser(user) {
    const schema = {
        fullname: Joi.string().min(5).required(),
        email: Joi.string().min(5).email().required(),
        contact: Joi.string().min(5).required()
    };
    return Joi.validate(user, schema)
}

exports.User = User;
exports.validate = valdationUser;
exports.userSchema = userSchema;