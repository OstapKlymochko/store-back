"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
const services_2 = require("../services");
const models_1 = require("../models");
const enums_1 = require("../enums");
class AuthController {
    async register(req, res, next) {
        try {
            const basketId = await services_2.basketServices.createBasket();
            const user = await services_1.authServices.register({ ...req.body, basket: basketId });
            return res.status(201).json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const { password } = req.body;
            const { item: user } = req.res.locals;
            const tokenPair = await services_1.authServices.login(password, user);
            return res.json(tokenPair);
        }
        catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const { tokenInfo } = req.res.locals;
            await Promise.all([
                models_1.User.findByIdAndUpdate(tokenInfo.user, { $set: { status: enums_1.EStatus.activated } }),
                models_1.ActionToken.findByIdAndDelete(tokenInfo._id)
            ]);
            return res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const { tokenInfo, jwtPayload } = req.res.locals;
            const tokenPair = await services_1.authServices.refresh(tokenInfo, jwtPayload);
            return res.json(tokenPair);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
