import {NextFunction, Response, Request} from "express";
import {UploadedFile} from "express-fileupload";
import {v4} from "uuid";

import {deviceServices} from "../services";
import {Device, User} from "../models";
import {IDevice, IDeviceResponse} from "../interfaces";
import {photosPath} from "../constants";
import {configs} from "../configs";
import {ApiError} from "../error";

class DeviceController {
    public async getAll(req: Request, res: Response, next: NextFunction): Promise<Response<IDeviceResponse[]>> {
        try {
            const devices = await Device.find().lean().select(['-description', '-updatedAt']);

            return res.json(devices);
        } catch (e) {
            next(e);
        }
    }

    public async getImg(req: Request, res: Response, next: NextFunction) {
        try {
            const {id, filename} = req.query
            return res.sendFile(photosPath([id.toString(), filename.toString()]));
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction): Promise<Response<IDevice>> {
        try {
            const {deviceId} = req.params;
            const device = await Device.findById(deviceId).populate({
                path: 'description',
                select: ['-updatedAt', '-createdAt'],
                populate: {
                    path: 'seller_id',
                    model: 'user',
                    select: ['-password', '-status', '-basket', '-updatedAt', '-createdAt']
                }
            }).select(['-createdAt']);
            if (!device) {
                throw new ApiError('Not exists', 403);
            }
            return res.json(device)
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

            avatar ? avatar.name = v4() + '.' + avatar.mimetype.split('/')[1] : avatar;
            !!images.length ? images.forEach((i: UploadedFile) => i.name = v4() + '.' + i.mimetype.split('/')[1]) : images;

            const {_id: descriptionId} = await deviceServices.createDeviceDescription({
                data: descriptionData,
                images: images.map((i: UploadedFile) => `${configs.API_URL}/device/images?id=${_id}&filename=${i.name}`),
                seller_id: _id
            });

            const newDevice = await deviceServices.createDevice({
                title, condition, price, brand, deviceType,
                avatar: avatar ?
                    `${configs.API_URL}/device/images?id=${_id}&filename=${avatar.name}` :
                    `${configs.API_URL}/device/images?id=default&filename=default.png`,
                description: descriptionId
            });

            Promise.all([
                User.findByIdAndUpdate(_id, {$push: {devices: newDevice._id}}),
                deviceServices.saveDeviceImages(_id, images, avatar)
            ]);

            console.log(Date.now() - start);
            return res.json(newDevice);
        } catch (e) {
            next(e);
        }
    }
}

export const deviceController = new DeviceController();