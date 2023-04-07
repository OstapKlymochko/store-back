const ApiError = require("../error/ApiError");

class CommonMiddleware {
    isBodyValid(validator) {
        return (req, res, next) => {
            try {
                const {error, value} = validator.validate(req.body);

                if (error) {
                    throw new ApiError(error.message, 400);
                }
                req.body = value;
                next();
            } catch (e) {
                next(e);
            }
        }
    }

    alreadyExistsHandler(model, fieldName, from = "body", dbField = "email") {
        return async (req, res, next) => {
            try {
                const fieldValue = req[from][fieldName];

                const user = await model.findOne({[dbField]: fieldValue});
                if (user) {
                    throw new ApiError(`User with ${fieldName} ${fieldValue} already exists`, 409);
                }

                next();
            } catch (e) {
                next(e);
            }
        }
    }
}

module.exports = new CommonMiddleware();