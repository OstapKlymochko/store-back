"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMapper = void 0;
const userMapper = (user) => {
    const { _id, firstName, lastName, email, basket, devices } = user;
    return { _id, firstName, lastName, email, basket, devices };
};
exports.userMapper = userMapper;
