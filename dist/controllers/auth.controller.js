"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
const services_2 = require("../services");
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
}
exports.authController = new AuthController();
