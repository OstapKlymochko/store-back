"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenServices = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const configs_1 = require("../configs");
const enums_1 = require("../enums");
const error_1 = require("../error");
class TokenServices {
    generateTokenPair(payload) {
        const accessToken = jwt.sign(payload, configs_1.configs.ACCESS_SECRET, {
            expiresIn: '7d'
        });
        const refreshToken = jwt.sign(payload, configs_1.configs.REFRESH_SECRET, {
            expiresIn: '21d'
        });
        return {
            accessToken,
            refreshToken
        };
    }
    checkToken(token, tokenType = enums_1.ETokenTypes.access) {
        try {
            let secret;
            switch (tokenType) {
                case enums_1.ETokenTypes.access:
                    secret = configs_1.configs.ACCESS_SECRET;
                    break;
                case enums_1.ETokenTypes.refresh:
                    secret = configs_1.configs.REFRESH_SECRET;
                    break;
            }
            return jwt.verify(token, secret);
        }
        catch (e) {
            throw new error_1.ApiError(e.message, e.status);
        }
    }
    generateActionToken(payload, tokenType = enums_1.EActionTypes.activate) {
        return jwt.sign(payload, tokenType, {
            expiresIn: '1h'
        });
    }
    checkActionToken(token, tokenType = enums_1.EActionTypes.activate) {
        return jwt.verify(token, tokenType);
    }
}
exports.tokenServices = new TokenServices();
