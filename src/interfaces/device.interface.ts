import {EConditions, EDeviceTypes} from "../enums";
import {IDeviceDesc} from "./device.description.interface";
import {UploadedFile} from "express-fileupload";
import {ObjectId} from 'mongoose';

export interface IDevice {
    _id?: string | ObjectId;
    title: string;
    price: number;
    rating?: number;
    condition: EConditions;
    avatar?: string | UploadedFile;
    deviceType: EDeviceTypes;
    brand: string;
    description: string | IDeviceDesc | ObjectId;
}

export type IDeviceResponse = Omit<IDevice, 'description'>;