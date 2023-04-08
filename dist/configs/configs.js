"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.configs = {
    PORT: process.env.PORT || 5100,
    DB_URL: process.env.DB_URL,
    ACCESS_SECRET: process.env.ACCESS_SECRET || 'asdasd',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'asdasd',
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    FRONT_URL: process.env.FRONT_URL || 'http://localhost:3000'
};
