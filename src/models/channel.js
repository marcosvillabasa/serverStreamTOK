const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let channelSchema = new Schema({
    title: {
        type: String,
        required: [true, "title name is required"],
    },
    slug: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('Channel', channelSchema);
