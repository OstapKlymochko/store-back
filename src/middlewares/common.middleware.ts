import {NextFunction, Request, Response} from "express";
import {Model} from 'mongoose';
import {ObjectSchema} from "joi";

import {ApiError} from "../error";

class CommonMiddleware {
    isBodyValid(validator: ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
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


    alreadyExistsHandler(model: Model<any>,
                         fieldName: string, from: 'body' | 'query' | 'params' = "body", dbField = "email") {
        return async (req: Request, res: Response, next: NextFunction) => {
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

export const commonMiddleware = new CommonMiddleware();