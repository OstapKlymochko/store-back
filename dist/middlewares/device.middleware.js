"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceMiddleware = void 0;
const models_1 = require("../models");
const validators_1 = require("../validators");
const error_1 = require("../error");
class DeviceMiddleware {
    async DeviceValidator(req, res, next) {
        try {
            if (!await models_1.Brand.exists({ name: req.body?.brand })) {
                throw new error_1.ApiError('No such brand', 409);
            }
            const { error, value } = validators_1.DeviceValidator.createDevice.validate({
                ...req.body,
                images: Array.isArray(req.files?.images) ? req.files?.images : req.files?.images ? [req.files.images] : [],
                avatar: req.files?.avatar
            });
            if (error) {
                throw new error_1.ApiError(error.message, 400);
            }
            req.res.locals.value = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.deviceMiddleware = new DeviceMiddleware();
