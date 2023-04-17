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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceValidator = void 0;
const Joi = __importStar(require("joi"));
const enums_1 = require("../enums");
class DeviceValidator {
}
_a = DeviceValidator;
DeviceValidator.title = Joi.string().min(2).max(50).trim();
DeviceValidator.price = Joi.number().min(0).max(1000000);
DeviceValidator.condition = Joi.valid(...Object.values(enums_1.EConditions));
DeviceValidator.avatar = Joi.object();
DeviceValidator.type = Joi.valid(...Object.values(enums_1.EDeviceTypes));
DeviceValidator.brand = Joi.string();
DeviceValidator.descriptionData = Joi.string().min(10).max(500);
DeviceValidator.images = Joi.array().max(15);
DeviceValidator.createDevice = Joi.object({
    title: _a.title.required(),
    price: _a.price.required(),
    condition: _a.condition.required(),
    avatar: _a.avatar,
    deviceType: _a.type.required(),
    brand: _a.brand.required(),
    descriptionData: _a.descriptionData.required(),
    images: _a.images,
});
exports.DeviceValidator = DeviceValidator;
