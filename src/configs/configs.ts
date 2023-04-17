import {config} from "dotenv";

config();
export const configs = {
    PORT: process.env.PORT || 5100,
    DB_URL: process.env.DB_URL,

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'asdasd',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'asdasd',

    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

    FRONT_URL: process.env.FRONT_URL || 'http://localhost:3000',
    API_URL: process.env.API_URL || `http://localhost:${process.env.PORT || 5100}`
}