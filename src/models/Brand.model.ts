import {Schema, model} from 'mongoose';
import {EDeviceTypes} from "../enums";

const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    devices_types: {
        type: [EDeviceTypes],
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true
});


export const Brand = model('brands', brandSchema);