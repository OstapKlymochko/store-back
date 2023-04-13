import {NextFunction, Response, Request} from "express";
import {UploadedFile} from "express-fileupload";
import {v4} from "uuid";

import {deviceServices} from "../services";

class DeviceController {
    public async createDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                value: {
                    descriptionData, images, title,
                    price, brand, condition, deviceType, avatar
                }, jwtPayload: {_id}
            } = req.res.locals;

            avatar ? avatar.name = v4() + '.jpeg' : images;
            !!images.length ? images.forEach((i: UploadedFile) => i.name = v4() + '.jpeg') : images;

            const {_id: descriptionId} = await deviceServices.createDeviceDescription({
                data: descriptionData,
                images: images.map((i: UploadedFile) => i.name),
                seller_id: _id
            });

            const newDevice = await deviceServices.createDevice({
                title, condition, price, brand,
                avatar: avatar ? avatar.name : undefined,
                deviceType: deviceType,
                description: descriptionId
            }, descriptionId);

            deviceServices.saveDeviceImages(newDevice._id.toString(), images, avatar);

            return res.json(newDevice);
        } catch (e) {
            next(e);
        }
    }
}

export const deviceController = new DeviceController();