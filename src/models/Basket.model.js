const {Schema, model, Types} = require('mongoose');
const Device = require('./Device.model');

const basketSchema = new Schema({
    devices: {
        type: [Types.ObjectId],
        required: true,
        ref: Device
    }
});

module.exports = model('basket', basketSchema);