"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceServices = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = require("fs");
const models_1 = require("../models");
const error_1 = require("../error");
const constants_1 = require("../constants");
class DeviceServices {
    async createDevice(device) {
        try {
            return await models_1.Device.create(device);
        }
        catch (e) {
            console.log(e);
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
            if ((images.length || avatar) && !(0, fs_1.existsSync)((0, constants_1.photosPath)([deviceId]))) {
                await promises_1.default.mkdir((0, constants_1.photosPath)([deviceId]));
            }
            await Promise.all([
                !!images.length && images.map(async (value) => {
                    await value.mv((0, constants_1.photosPath)([deviceId, value.name]));
                }),
                !!avatar && avatar.mv((0, constants_1.photosPath)([deviceId, avatar.name]))
            ]);
        }
        catch (e) {
            throw new error_1.ApiError(e.message, e.status);
        }
    }
}
exports.deviceServices = new DeviceServices();
