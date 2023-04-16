"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceController = void 0;
const uuid_1 = require("uuid");
const services_1 = require("../services");
const models_1 = require("../models");
const constants_1 = require("../constants");
class DeviceController {
    async getAll(req, res, next) {
        try {
            const devices = await models_1.Device.find().lean();
            return res.json(devices.map(({ _id, title, price, rating, condition, avatar }) => {
                return {
                    _id,
                    title,
                    price,
                    rating,
                    condition,
                    avatar: avatar ? avatar : 'undefined'
                };
            }));
        }
        catch (e) {
            next(e);
        }
    }
    async getImg(req, res, next) {
        try {
            const { deviceId, imgPath } = req.params;
            return res.sendFile((0, constants_1.photosPath)([deviceId, imgPath]));
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { deviceId } = req.params;
            const device = await models_1.Device.findById(deviceId);
            console.log(device);
        }
        catch (e) {
            next(e);
        }
    }
    async createDevice(req, res, next) {
        try {
            const start = Date.now();
            const { value: { descriptionData, images, title, price, brand, condition, deviceType, avatar }, jwtPayload: { _id } } = req.res.locals;
            avatar ? avatar.name = (0, uuid_1.v4)() + '.jpeg' : avatar;
            !!images.length ? images.forEach((i) => i.name = (0, uuid_1.v4)() + '.jpeg') : images;
            const { _id: descriptionId } = await services_1.deviceServices.createDeviceDescription({
                data: descriptionData,
                images: images.map((i) => i.name),
                seller_id: _id
            });
            const newDevice = await services_1.deviceServices.createDevice({
                title, condition, price, brand, deviceType,
                avatar: avatar ? avatar.name : undefined,
                description: descriptionId
            });
            Promise.all([
                models_1.User.findByIdAndUpdate(_id, { $push: { devices: newDevice._id } }),
                services_1.deviceServices.saveDeviceImages(newDevice._id.toString(), images, avatar)
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
