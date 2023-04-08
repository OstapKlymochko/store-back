"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const error_1 = require("../error");
const models_1 = require("../models");
const services_1 = require("../services");
const enums_1 = require("../enums");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get('Authorization');
            const jwtPayload = services_1.tokenServices.checkToken(accessToken);
            const tokenInfo = await models_1.Token.findOne({ accessToken });
            if (!tokenInfo) {
                throw new error_1.ApiError('Invalid Token', 401);
            }
            req.res.locals = { ...req.res.locals, jwtPayload, tokenInfo };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const refreshToken = req.get('Authorization');
            const jwtPayload = services_1.tokenServices.checkToken(refreshToken, enums_1.ETokenTypes.refresh);
            const tokenInfo = await models_1.Token.findOne({ refreshToken });
            if (!tokenInfo) {
                throw new error_1.ApiError('Invalid Token', 401);
            }
            req.res.locals = { ...req.res.locals, jwtPayload, tokenInfo };
            console.log(jwtPayload);
            next();
        }
        catch (e) {
            next(e);
        }
    }
    checkActionToken(tokenType) {
        return async (req, res, next) => {
            try {
                const { token } = req.params;
                const jwtPayload = services_1.tokenServices.checkActionToken(token, tokenType);
                const tokenInfo = await models_1.ActionToken.findOne({ token });
                if (!tokenInfo) {
                    throw new error_1.ApiError('Invalid Token', 400);
                }
                req.res.locals = { ...req.res.locals, jwtPayload, tokenInfo };
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.authMiddleware = new AuthMiddleware();
