const {Schema, model} = require('mongoose');

const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});


module.exports = model('brands', brandSchema);