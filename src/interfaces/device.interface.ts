import {EConditions, EDeviceTypes} from "../enums";
import {IDeviceDesc} from "./device.description.interface";

export interface IDevice {
    _id?: string;
    title: string;
    price: number;
    rating: number;
    condition: EConditions;
    avatar?: string;
    deviceType: EDeviceTypes;
    brand: string;
    description: string | IDeviceDesc;
}