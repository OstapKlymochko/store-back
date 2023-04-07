"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basketServices = void 0;
const error_1 = require("../error");
const models_1 = require("../models");
class BasketServices {
    async createBasket() {
        try {
            const { id } = await models_1.Basket.create({
                devices: []
            });
            return id;
        }
        catch (e) {
            throw new error_1.ApiError(e.message, e.status);
        }
    }
}
exports.basketServices = new BasketServices();
