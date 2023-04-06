const mongoose = require('mongoose');
const configs = require('./configs/configs');
const express = require('express');
// const User = require('./models/User.model');
// const DevDesc = require('./models/Device.description.model');
// const Device = require('./models/Device.model');
// const Brand = require('./models/Brand.model')

const app = express();

app.listen(configs.PORT, async () => {
    await mongoose.connect(configs.DB_URL);
    console.log(`Server has started on port ${configs.PORT}`);
})