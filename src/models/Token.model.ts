import {Schema, model, Types} from "mongoose";
import {User} from "./User.model";

const tokenSchema = new Schema({
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
        type: Types.ObjectId,
        required: true,
        ref: User
    }
}, {
    versionKey: false,
    timestamps: true,
});

export const Token = model('token', tokenSchema);