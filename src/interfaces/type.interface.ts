import {EDeviceTypes} from "../enums";

export interface IType {
    _id?: string;
    name: EDeviceTypes;
    brands: string[];
}