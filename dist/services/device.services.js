"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceServices = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const models_1 = require("../models");
const error_1 = require("../error");
const constants_1 = require("../constants");
class DeviceServices {
    async createDevice(device, descriptionId) {
        try {
            const { deviceType, brand: brandName } = device;
            const [type, brand] = await Promise.all([
                models_1.Type.findOne({ name: deviceType }),
                models_1.Brand.findOne({ name: brandName })
            ]);
            return await models_1.Device.create({
                ...device,
                deviceType: type._id,
                brand: brand._id,
                description: descriptionId
            });
        }
        catch (e) {
            throw new error_1.ApiError(e.message, e.status);
        }
    }
    async createDeviceDescription(description) {
        try {
            return await models_1.DeviceDescription.create(description);
        }
        catch (e) {
            throw new error_1.ApiError(e.message, e.status);
        }
    }
    async saveDeviceImages(deviceId, images, avatar) {
        try {
            await Promise.all([
                !!images.length && promises_1.default.mkdir(constants_1.photosPaths.device([deviceId])),
                !!avatar && promises_1.default.mkdir(constants_1.photosPaths.avatar([deviceId]))
            ]);
            await Promise.all([
                !!images.length && images.map(async (value) => {
                    await value.mv(constants_1.photosPaths.device([deviceId, value.name]));
                }),
                !!avatar && avatar.mv(constants_1.photosPaths.avatar([deviceId, avatar.name]))
            ]);
        }
        catch (e) {
            throw new error_1.ApiError(e.message, e.status);
        }
    }
}
exports.deviceServices = new DeviceServices();
