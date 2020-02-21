const joi = require('@hapi/joi');
const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let eventSchema = new Schema({
    name: {
        type: String,
        required: [true, "event name is required"],
        minlength: 5,
        maxlength: 50
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    description: {
        type: String
    },
    url: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('Event', eventSchema);
