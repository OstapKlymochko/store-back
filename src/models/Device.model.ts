import {Schema, model, Types} from 'mongoose';

import {EConditions, EDeviceTypes} from "../enums";
import {DeviceDescription} from "./Device.description.model";

console.log(EDeviceTypes);
export const deviceSchema = new Schema({
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
            enum: EConditions
        },
        avatar: {
            type: String,
        },
        deviceType: {
            kind: String,
            enum: EDeviceTypes,
            required: true,
        },
        brand: {
            kind: String,
            required: true,
        },
        description: {
            type: Types.ObjectId,
            required: true,
            ref: DeviceDescription,
        },
    },
    {
        versionKey: false,
        timestamps: true
    });

export const Device = model('device', deviceSchema);