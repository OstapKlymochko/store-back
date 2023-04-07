import {Schema, model, Types} from 'mongoose';

import {Device} from './Device.model';

const basketSchema = new Schema({
    devices: {
        type: [Types.ObjectId],
        required: true,
        ref: Device
    }
});

export const Basket = model('basket', basketSchema);