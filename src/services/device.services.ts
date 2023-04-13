import {UploadedFile} from "express-fileupload";
import fs from "fs/promises";

import {IDevice, IDeviceDesc} from "../interfaces";
import {Brand, Device, DeviceDescription, Type} from "../models";
import {ApiError} from "../error";
import {photosPaths} from "../constants";

class DeviceServices {
    public async createDevice(device: IDevice, descriptionId: string): Promise<any> {
        try {
            const {deviceType, brand: brandName} = device;

            const [type, brand] = await Promise.all([
                Type.findOne({name: deviceType}),
                Brand.findOne({name: brandName})
            ]);

            return await Device.create({
                ...device,
                deviceType: type._id,
                brand: brand._id,
                description: descriptionId
            });
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async createDeviceDescription(description: IDeviceDesc): Promise<any> {
        try {
            return await DeviceDescription.create(description);
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async saveDeviceImages(deviceId: string, images?: UploadedFile[], avatar?: UploadedFile): Promise<void> {
        try {

            await Promise.all([
                !!images.length && fs.mkdir(photosPaths.device([deviceId])),
                !!avatar && fs.mkdir(photosPaths.avatar([deviceId]))
            ]);

            await Promise.all([
                !!images.length && images.map(async (value) => {
                    await value.mv(photosPaths.device([deviceId, value.name]));
                }),
                !!avatar && avatar.mv(photosPaths.avatar([deviceId, avatar.name]))
            ]);

        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const deviceServices = new DeviceServices();