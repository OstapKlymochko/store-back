"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const models_1 = require("../models");
class UserController {
    async getById(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await models_1.User.findById(userId).populate('devices').select(['-password', '-status']);
            return res.json(user);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
