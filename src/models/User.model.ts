import {Schema, model, Types} from 'mongoose';

import {EStatus} from "../enums";
import {Basket} from "./Basket.model";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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
    basket: {
        type: Types.ObjectId,
        required: true,
        ref: Basket
    },
    status: {
        type: String,
        enum: EStatus,
        default: EStatus.not_activated
    }
}, {
    versionKey: false,
    timestamps: true
})


export const User = model('user', userSchema);