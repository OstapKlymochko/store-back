import {Schema, model, Types} from 'mongoose';

import {Type} from './Type.model';
import {Brand} from './Brand.model';
import {EConditions} from "../enums";
import {DeviceDescription} from "./Device.description.model";
// import {User} from "./User.model";
// import {DeviceDescription} from "./Device.description.model";

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
            enum: EConditions
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
            required: true,
            ref: DeviceDescription,
        },
    },
    {
        versionKey: false,
        timestamps: true
    });


export const Device = model('device', deviceSchema);