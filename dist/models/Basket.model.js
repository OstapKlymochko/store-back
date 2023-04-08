"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basket = void 0;
const mongoose_1 = require("mongoose");
const Device_model_1 = require("./Device.model");
const basketSchema = new mongoose_1.Schema({
    items: {
        type: [mongoose_1.Types.ObjectId],
        required: true,
        ref: Device_model_1.Device
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.Basket = (0, mongoose_1.model)('basket', basketSchema);
