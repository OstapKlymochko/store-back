import {UploadedFile} from "express-fileupload";
import fs from "fs/promises";

import {IDevice, IDeviceDesc} from "../interfaces";
import {Device, DeviceDescription} from "../models";
import {ApiError} from "../error";
import {photosPath} from "../constants";

class DeviceServices {
    public async createDevice(device: IDevice): Promise<any> {
        try {
            console.log(device);
            return await Device.create(device);
        } catch (e) {
            console.log(e);
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

            (!!images.length || !!avatar) && await fs.mkdir(photosPath([deviceId]))

            await Promise.all([
                !!images.length && images.map(async (value) => {
                    await value.mv(photosPath([deviceId, value.name]));
                }),
                !!avatar && avatar.mv(photosPath([deviceId, avatar.name]))
            ]);

        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const deviceServices = new DeviceServices();