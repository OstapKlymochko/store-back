import * as Joi from 'joi';

import {regexpConstants} from "../constants";

class UserValidator {
    private static userName = Joi.string().min(2).max(30).trim();
    private static email = Joi.string().regex(regexpConstants.EMAIL).trim().lowercase();
    private static password = Joi.string().regex(regexpConstants.PASSWORD);

    static createUser = Joi.object({
        firstName: this.userName.required(),
        lastName: this.userName.required(),
        email: this.email.required(),
        password: this.password.required(),
    });

    static login = Joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });
}

export const userValidator = UserValidator;
