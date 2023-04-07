const mongoose = require('mongoose');
const configs = require('./configs/configs');
const express = require('express');
const authRouter = require('./routers/auth.router');
// const User = require('./models/User.model');
// const DevDesc = require('./models/Device.description.model');
// const Device = require('./models/Device.model');
// const Brand = require('./models/Brand.model')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);

app.use((err, req, res, next) => {
    const status = err.status || 500;

    return res.status(status).json({
        message: err.message
    });
})

app.listen(configs.PORT, async () => {
    await mongoose.connect(configs.DB_URL);
    console.log(`Server has started on port ${configs.PORT}`);
})