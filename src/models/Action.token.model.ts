import {Schema, model, Types} from 'mongoose';
import {EActionTypes} from "../enums";
import {User} from "./User.model";

const actionSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    action_type: {
        type: String,
        enum: EActionTypes,
        required: true
    },
    user: {
        type: Types.ObjectId,
        required: true,
        ref: User
    }
}, {
    versionKey: false,
    timestamps: true
});

export const ActionToken = model('action_token', actionSchema);