import {IDevice, IDeviceResponse} from "../interfaces";

export const deviceMapper = (device: IDevice): IDeviceResponse => {
    const {
        _id, title, price, rating, condition, avatar
        , deviceType, brand
    } = device;

    return { _id, title, price, rating, condition, avatar , deviceType, brand };
}