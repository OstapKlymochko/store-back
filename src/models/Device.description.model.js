const {Schema, model, Types} = require('mongoose');

const User = require('./User.model');

const descSchema = new Schema({
    data: {
        type: String,
        required: true
    },
    images: {
        type: [String],
    },
    seller: {
        type: Types.ObjectId,
        required: true,
        ref: User
    }
});

module.exports = model('device_descriptions', descSchema);