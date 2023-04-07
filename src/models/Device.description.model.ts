import {Schema, model, Types} from 'mongoose';

const descSchema = new Schema({
    data: {
        type: String,
        required: true
    },
    images: {
        type: [String],
    },
    seller_id: {
        type: Types.ObjectId,
        required: true,
    }
});

export const DeviceDescription = model('device_descriptions', descSchema);


// firstName
// "Anya"
// lastName
// "Velgus"
// email
// "anyavel@gmail.com"
// password
// "331"
// status
// "activated"