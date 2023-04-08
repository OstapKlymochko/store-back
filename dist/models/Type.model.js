"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
const Brand_model_1 = require("./Brand.model");
const typeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: enums_1.EDeviceTypes,
        required: true,
        unique: true
    },
    brands: {
        type: [mongoose_1.Types.ObjectId],
        required: true,
        ref: Brand_model_1.Brand
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.Type = (0, mongoose_1.model)('type', typeSchema);
