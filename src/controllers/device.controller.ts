import {NextFunction, Response, Request} from "express";
import {UploadedFile} from "express-fileupload";
import {v4} from "uuid";

import {deviceServices} from "../services";
import {Device, User} from "../models";
import {IDeviceResponse} from "../interfaces";
import {photosPath} from "../constants";

class DeviceController {
    public async getAll(req: Request, res: Response, next: NextFunction): Promise<Response<IDeviceResponse[]>> {
        try {
            const devices = await Device.find().lean();

            return res.json(devices.map(({_id, title, price, rating, condition, avatar}) => {
                return {
                    _id,
                    title,
                    price,
                    rating,
                    condition,
                    avatar: avatar ? avatar : 'undefined'
                }
            }));
        } catch (e) {
            next(e);
        }
    }

    public async getImg(req: Request, res: Response, next: NextFunction) {
        try {
            const {deviceId, imgPath} = req.params;
            return res.sendFile(photosPath([deviceId, imgPath]));
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const {deviceId} = req.params;

            const device = await Device.findById(deviceId);
            console.log(device);
        } catch (e) {
            next(e);
        }
    }
    public async createDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const start = Date.now();
            const {
                value: {
                    descriptionData, images, title,
                    price, brand, condition, deviceType, avatar
                }, jwtPayload: {_id}
            } = req.res.locals;

            avatar ? avatar.name = v4() + '.jpeg' : avatar;
            !!images.length ? images.forEach((i: UploadedFile) => i.name = v4() + '.jpeg') : images;

            const {_id: descriptionId} = await deviceServices.createDeviceDescription({
                data: descriptionData,
                images: images.map((i: UploadedFile) => i.name),
                seller_id: _id
            });

            const newDevice = await deviceServices.createDevice({
                title, condition, price, brand, deviceType,
                avatar: avatar ? avatar.name : undefined,
                description: descriptionId
            });

            Promise.all([
                User.findByIdAndUpdate(_id, {$push: {devices: newDevice._id}}),
                deviceServices.saveDeviceImages(newDevice._id.toString(), images, avatar)
            ]);

            console.log(Date.now() - start);
            return res.json(newDevice);
        } catch (e) {
            next(e);
        }
    }
}

export const deviceController = new DeviceController();