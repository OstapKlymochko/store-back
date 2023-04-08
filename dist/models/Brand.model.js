"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const mongoose_1 = require("mongoose");
const brandSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.Brand = (0, mongoose_1.model)('brands', brandSchema);
