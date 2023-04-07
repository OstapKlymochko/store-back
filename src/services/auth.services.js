const bcrypt = require('bcrypt');

const User = require('../models/User.model');
const ApiError = require("../error/ApiError");

class AuthServices {
    async register(user) {
        try {
            const {password} = user;
            const hashedPassword = await bcrypt.hash(password, 5);
            return await User.create({
                ...user,
                password: hashedPassword
            });
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

module.exports = new AuthServices();