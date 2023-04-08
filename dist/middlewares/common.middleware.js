"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddleware = void 0;
const mongoose_1 = require("mongoose");
const error_1 = require("../error");
class CommonMiddleware {
    isIdValid(idField, from = 'params') {
        return (req, res, next) => {
            try {
                const id = req[from][idField];
                if (!(0, mongoose_1.isObjectIdOrHexString)(id)) {
                    throw new error_1.ApiError('Invalid ID', 400);
                }
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    isBodyValid(validator) {
        return (req, res, next) => {
            try {
                const { error, value } = validator.validate(req.body);
                if (error) {
                    throw new error_1.ApiError(error.message, 400);
                }
                req.body = value;
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    alreadyExistsHandler(model, fieldName, from = "body", dbField = "email") {
        return async (req, res, next) => {
            try {
                const fieldValue = req[from][fieldName];
                const item = await model.findOne({ [dbField]: fieldValue });
                if (item) {
                    throw new error_1.ApiError(`Record with ${fieldName} ${fieldValue} already exists`, 409);
                }
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    notExistsHandler(model, fieldName, from = "body", dbField = "email") {
        return async (req, res, next) => {
            try {
                const fieldValue = req[from][fieldName];
                const item = await model.findOne({ [dbField]: fieldValue });
                if (!item) {
                    throw new error_1.ApiError(`Record with ${fieldName} ${fieldValue} not exists`, 422);
                }
                req.res.locals.item = item;
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.commonMiddleware = new CommonMiddleware();
