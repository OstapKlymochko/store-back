"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const mongoose_1 = require("mongoose");
const User_model_1 = require("./User.model");
const tokenSchema = new mongoose_1.Schema({
    accessToken: {
        type: String,
        required: true,
        unique: true
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: User_model_1.User
    }
}, {
    versionKey: false,
    timestamps: true,
});
exports.Token = (0, mongoose_1.model)('token', tokenSchema);
