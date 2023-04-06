const {Schema, model} = require('mongoose');
const EStatus = require('../enums/status.enums');

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    status: {
        type: String,
        enum: EStatus
    }
}, {
    versionKey: false,
    timestamps: true
})


module.exports = model('user', userSchema);