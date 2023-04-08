import {Schema, model, Types} from 'mongoose';

import {EDeviceTypes} from "../enums";
import {Brand} from "./Brand.model";

const typeSchema = new Schema({
    name: {
        type: String,
        enum: EDeviceTypes,
        required: true,
        unique: true
    },
    brands: {
        type: [Types.ObjectId],
        required: true,
        ref: Brand
    }
}, {
    versionKey: false,
    timestamps: true
});


export const Type = model('type', typeSchema);