import {Schema, model} from 'mongoose';

import {EDeviceTypes} from "../enums";

const typeSchema = new Schema({
    name: {
        type: String,
        enum: EDeviceTypes,
        required: true
    },
    brands: {
        type: [String],
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});


export const Type = model('type', typeSchema);