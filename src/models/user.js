const joi = require('@hapi/joi');
const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let validRole = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} It is not a valid role'
};

let userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 5,
        maxlength: 1024,
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRole
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} email must be unique' });

function validateUser(user) {
    const schema = {
        name: joi.string().min(5).max(30).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(1024).required()
    }
    return joi.validate(user, schema);
}

module.exports = mongoose.model('User', userSchema);
