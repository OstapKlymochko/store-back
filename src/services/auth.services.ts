import bcrypt from "bcrypt";

import {User} from "../models";
import {ApiError} from "../error";

class AuthServices {
    async register(user: any) {
        try {
            const {password} = user;
            const hashedPassword = await bcrypt.hash(password, 5);
            return await User.create({
                ...user,
                password: hashedPassword
            });
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const authServices = new AuthServices();