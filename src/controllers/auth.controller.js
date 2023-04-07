const authServices = require('../services/auth.services');
const basketServices = require('../services/basket.services');

class AuthController {
    async register(req, res, next) {
        try {
            const basketId = await basketServices.createBasket();
            const user = await authServices.register({...req.body, basket: basketId});
            return res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();