"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
const Basket_model_1 = require("./Basket.model");
const Device_model_1 = require("./Device.model");
const userSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: Basket_model_1.Basket
    },
    status: {
        type: String,
        enum: enums_1.EStatus,
        default: enums_1.EStatus.not_activated
    },
    devices: {
        type: [mongoose_1.Types.ObjectId],
        required: true,
        default: [],
        ref: Device_model_1.Device
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.User = (0, mongoose_1.model)('user', userSchema);
