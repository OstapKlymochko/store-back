import {EConditions, EDeviceTypes} from "../enums";
import {IDeviceDesc} from "./device.description.interface";
import {UploadedFile} from "express-fileupload";
import {ObjectId} from 'mongoose';
import {IBrand} from "./brand.interface";

export interface IDevice {
    _id?: string | ObjectId;
    title: string;
    price: number;
    rating?: number;
    condition: EConditions;
    avatar?: string | UploadedFile;
    deviceType: EDeviceTypes | ObjectId | string;
    brand: string | ObjectId | IBrand;
    description: string | IDeviceDesc | ObjectId;
}