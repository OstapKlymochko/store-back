"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceController = void 0;
const uuid_1 = require("uuid");
const services_1 = require("../services");
const models_1 = require("../models");
const constants_1 = require("../constants");
const configs_1 = require("../configs");
const error_1 = require("../error");
class DeviceController {
    async getAll(req, res, next) {
        try {
            const devices = await models_1.Device.find().lean().select(['-description', '-updatedAt']);
            return res.json(devices);
        }
        catch (e) {
            next(e);
        }
    }
    async getImg(req, res, next) {
        try {
            const { id, filename } = req.query;
            return res.sendFile((0, constants_1.photosPath)([id.toString(), filename.toString()]));
        }
        catch (e) {
            console.log(e);
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { deviceId } = req.params;
            const device = await models_1.Device.findById(deviceId).populate({
                path: 'description',
                select: ['-updatedAt', '-createdAt'],
                populate: {
                    path: 'seller_id',
                    model: 'user',
                    select: ['-password', '-status', '-basket', '-updatedAt', '-createdAt']
                }
            }).select(['-createdAt']);
            if (!device) {
                throw new error_1.ApiError('Not exists', 403);
            }
            return res.json(device);
        }
        catch (e) {
            next(e);
        }
    }
    async createDevice(req, res, next) {
        try {
            const start = Date.now();
            const { value: { descriptionData, images, title, price, brand, condition, deviceType, avatar }, jwtPayload: { _id } } = req.res.locals;
            avatar ? avatar.name = (0, uuid_1.v4)() + '.' + avatar.mimetype.split('/')[1] : avatar;
            !!images.length ? images.forEach((i) => i.name = (0, uuid_1.v4)() + '.' + i.mimetype.split('/')[1]) : images;
            const { _id: descriptionId } = await services_1.deviceServices.createDeviceDescription({
                data: descriptionData,
                images: images.map((i) => `${configs_1.configs.API_URL}/device/images?id=${_id}&filename=${i.name}`),
                seller_id: _id
            });
            const newDevice = await services_1.deviceServices.createDevice({
                title, condition, price, brand, deviceType,
                avatar: avatar ?
                    `${configs_1.configs.API_URL}/device/images?id=${_id}&filename=${avatar.name}` :
                    `${configs_1.configs.API_URL}/device/images?id=default&filename=default.png`,
                description: descriptionId
            });
            Promise.all([
                models_1.User.findByIdAndUpdate(_id, { $push: { devices: newDevice._id } }),
                services_1.deviceServices.saveDeviceImages(_id, images, avatar)
            ]);
            console.log(Date.now() - start);
            return res.json(newDevice);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.deviceController = new DeviceController();
