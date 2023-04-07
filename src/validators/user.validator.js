const Joi = require('joi');

const EStatus = require('../enums/status.enums');
const regexp = require('../constants/regexp.constants');

class UserValidator {
    static name = Joi.string().min(2).max(30).trim();
    static email = Joi.string().regex(regexp.EMAIL).trim().lowercase();
    static password = Joi.string().regex(regexp.PASSWORD);
    static status = Joi.valid(...EStatus);

    static createUser = Joi.object({
        firstName: this.name.required(),
        lastName: this.name.required(),
        email: this.email.required(),
        password: this.password.required(),
    });

    static login = Joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });
}

module.exports = UserValidator;
