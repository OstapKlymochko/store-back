"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models");
const error_1 = require("../error");
class AuthServices {
    async register(user) {
        try {
            const { password } = user;
            const hashedPassword = await bcrypt_1.default.hash(password, 5);
            return await models_1.User.create({
                ...user,
                password: hashedPassword
            });
        }
        catch (e) {
            throw new error_1.ApiError(e.message, e.status);
        }
    }
}
exports.authServices = new AuthServices();
