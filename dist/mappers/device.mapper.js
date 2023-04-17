"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceMapper = void 0;
const deviceMapper = (device) => {
    const { _id, title, price, rating, condition, avatar, deviceType, brand } = device;
    return { _id, title, price, rating, condition, avatar, deviceType, brand };
};
exports.deviceMapper = deviceMapper;
