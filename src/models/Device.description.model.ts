import {Schema, model, Types} from 'mongoose';

const descSchema = new Schema({
    data: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true,
        default: []
    },
    seller_id: {
        type: Types.ObjectId,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true
});

export const DeviceDescription = model('device_descriptions', descSchema);