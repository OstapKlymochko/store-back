const {Schema, model, Types} = require('mongoose');
const Type = require('./Type.model');
const Brand = require('./Brand.model');
const ECond = require('../enums/conditions.enum');

const deviceSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        condition: {
            type: String,
            required: true,
            enum: ECond
        },
        avatar: {
            type: String
        },
        deviceType: {
            type: Types.ObjectId,
            required: true,
            ref: Type
        },
        brand: {
            type: Types.ObjectId,
            required: true,
            ref: Brand
        },
        description: {
            type: Types.ObjectId,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    });


module.exports = model('device', deviceSchema);