"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
const brandSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    devices_types: {
        type: [String],
        enum: enums_1.EDeviceTypes,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.Brand = (0, mongoose_1.model)('brands', brandSchema);
