"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionToken = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
const User_model_1 = require("./User.model");
const actionSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true
    },
    action_type: {
        type: String,
        enum: enums_1.EActionTypes,
        required: true
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: User_model_1.User
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.ActionToken = (0, mongoose_1.model)('action_token', actionSchema);
