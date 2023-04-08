import {Schema, model, Types} from 'mongoose';

import {Device} from './Device.model';

const basketSchema = new Schema({
    items: {
        type: [Types.ObjectId],
        required: true,
        ref: Device
    }
}, {
    versionKey: false,
    timestamps: true
});

export const Basket = model('basket', basketSchema);