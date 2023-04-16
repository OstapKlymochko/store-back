import {NextFunction, Response, Request} from "express";

import {Brand} from "../models";
import {DeviceValidator} from "../validators";
import {ApiError} from "../error";

class DeviceMiddleware {
    public async DeviceValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const brand = await Brand.findOne({name: req.body?.brand});
            if (!brand) {
                throw new ApiError('No such brand', 409);
            }

            const {error, value} = DeviceValidator.createDevice.validate({
                ...req.body,
                images: Array.isArray(req.files?.images) ? req.files?.images : req.files?.images ? [req.files.images] : [],
                avatar: req.files?.avatar
            });
            if (error) {
                throw new ApiError(error.message, 400);
            }
            req.res.locals.value = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const deviceMiddleware = new DeviceMiddleware();