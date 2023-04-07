"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceDescription = void 0;
const mongoose_1 = require("mongoose");
const descSchema = new mongoose_1.Schema({
    data: {
        type: String,
        required: true
    },
    images: {
        type: [String],
    },
    seller_id: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    }
});
exports.DeviceDescription = (0, mongoose_1.model)('device_descriptions', descSchema);
