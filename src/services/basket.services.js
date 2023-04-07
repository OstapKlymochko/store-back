const ApiError = require("../error/ApiError");
const Basket = require('../models/Basket.model');

class BasketServices {
    async createBasket() {
        try {
            const {id} = await Basket.create({
                devices: []
            });
            return id;
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

module.exports = new BasketServices();