"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceController = void 0;
const uuid_1 = require("uuid");
const services_1 = require("../services");
class DeviceController {
    async createDevice(req, res, next) {
        try {
            const { value: { descriptionData, images, title, price, brand, condition, deviceType, avatar }, jwtPayload: { _id } } = req.res.locals;
            avatar ? avatar.name = (0, uuid_1.v4)() + '.jpeg' : images;
            !!images.length ? images.forEach((i) => i.name = (0, uuid_1.v4)() + '.jpeg') : images;
            const { _id: descriptionId } = await services_1.deviceServices.createDeviceDescription({
                data: descriptionData,
                images: images.map((i) => i.name),
                seller_id: _id
            });
            const newDevice = await services_1.deviceServices.createDevice({
                title, condition, price, brand,
                avatar: avatar ? avatar.name : undefined,
                deviceType: deviceType,
                description: descriptionId
            }, descriptionId);
            services_1.deviceServices.saveDeviceImages(newDevice._id.toString(), images, avatar);
            return res.json(newDevice);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.deviceController = new DeviceController();
