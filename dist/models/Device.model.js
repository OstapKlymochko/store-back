"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
const Device_description_model_1 = require("./Device.description.model");
const deviceSchema = new mongoose_1.Schema({
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
        enum: enums_1.EConditions
    },
    avatar: {
        type: String,
    },
    deviceType: {
        type: String,
        enum: enums_1.EDeviceTypes,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    description: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: Device_description_model_1.DeviceDescription,
    },
}, {
    versionKey: false,
    timestamps: true
});
exports.Device = (0, mongoose_1.model)('devices', deviceSchema);
