"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models");
const error_1 = require("../error");
const token_services_1 = require("./token.services");
const email_services_1 = require("./email.services");
const enums_1 = require("../enums");
class AuthServices {
    async register(user) {
        try {
            const { email, password, firstName, lastName } = user;
            const hashedPassword = await bcrypt_1.default.hash(password, 5);
            const newUser = await models_1.User.create({
                ...user,
                password: hashedPassword
            });
            const token = token_services_1.tokenServices.generateActionToken({ _id: newUser._id.toString(), firstName, lastName });
            await Promise.all([
                models_1.ActionToken.create({ user: newUser._id, token, action_type: enums_1.EActionTypes.activate }),
                email_services_1.emailServices.sendMail(email, enums_1.EEmailActions.ACTIVATE, { username: `${firstName} ${lastName}`, token })
            ]);
            return newUser;
        }
        catch (e) {
            throw new error_1.ApiError(e.message, e.status);
        }
    }
    async login(password, user) {
        try {
            const compareRes = await bcrypt_1.default.compare(password, user.password);
            if (!compareRes) {
                throw new error_1.ApiError('Wrong Email or Password', 400);
            }
            const tokenPair = token_services_1.tokenServices.generateTokenPair({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName
            });
            const exists = await models_1.Token.exists({ user: user._id });
            if (exists) {
                await models_1.Token.findOneAndUpdate({ user: user._id }, {
                    $set: {
                        accessToken: tokenPair.accessToken,
                        refreshToken: tokenPair.refreshToken
                    }
                });
            }
            else {
                await models_1.Token.create({ user: user._id, ...tokenPair });
            }
            return tokenPair;
        }
        catch (e) {
            throw new error_1.ApiError(e.message, e.status);
        }
    }
    async refresh(tokenInfo, { _id, firstName, lastName }) {
        try {
            const tokenPair = token_services_1.tokenServices.generateTokenPair({ _id, firstName, lastName });
            await models_1.Token.findByIdAndUpdate(tokenInfo._id, {
                accessToken: tokenPair.accessToken,
                refreshToken: tokenPair.refreshToken
            });
            return tokenPair;
        }
        catch (e) {
            throw new error_1.ApiError(e.message, e.status);
        }
    }
}
exports.authServices = new AuthServices();
