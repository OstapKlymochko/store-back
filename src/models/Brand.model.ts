import {Schema, model} from 'mongoose';

const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    }
}, {
    versionKey: false,
    timestamps: true
});


export const Brand = model('brands', brandSchema);