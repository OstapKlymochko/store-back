const {Schema, model} = require('mongoose');
const ETypes = require('../enums/deviceTypes.enum');

const typeSchema = new Schema({
    name: {
        type: String,
        enum: ETypes,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});


module.exports = model('type', typeSchema);