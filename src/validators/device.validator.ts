import * as Joi from 'joi';
import {UploadedFile} from "express-fileupload";

import {EConditions, EDeviceTypes} from "../enums";

export class DeviceValidator {
    private static title = Joi.string().min(2).max(50).trim();
    private static price = Joi.number().min(0).max(1000000);
    private static condition = Joi.valid(...Object.values(EConditions));
    private static avatar = Joi.object<UploadedFile>();
    private static type = Joi.valid(...Object.values(EDeviceTypes));
    private static brand = Joi.string();
    private static descriptionData = Joi.string().min(10).max(500);

    private static images = Joi.array<UploadedFile>().max(15);

    static createDevice = Joi.object({
        title: this.title.required(),
        price: this.price.required(),
        condition: this.condition.required(),
        avatar: this.avatar,
        deviceType: this.type.required(),
        brand: this.brand.required(),
        descriptionData: this.descriptionData.required(),
        images: this.images,
    });
}
