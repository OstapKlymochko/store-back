import {NextFunction, Request, Response} from "express";
import {Model, isObjectIdOrHexString} from 'mongoose';
import {ObjectSchema} from "joi";

import {ApiError} from "../error";

class CommonMiddleware {
    public isIdValid(idField: string, from: 'params' | 'query' | 'body' = 'params') {
        return (req: Request, res: Response, next: NextFunction): void => {
            try {
                const id = req[from][idField];
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError('Invalid ID', 400);
                }

                next();
            } catch (e) {
                next(e);
            }
        }
    }

    public isBodyValid(validator: ObjectSchema) {
        return (req: Request, res: Response, next: NextFunction): void => {
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


    public alreadyExistsHandler(model: Model<any>,
                                fieldName: string, from: 'body' | 'query' | 'params' = "body", dbField = "email") {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const fieldValue = req[from][fieldName];

                const item = await model.findOne({[dbField]: fieldValue});
                if (item) {
                    throw new ApiError(`Record with ${fieldName} ${fieldValue} already exists`, 409);
                }

                next();
            } catch (e) {
                next(e);
            }
        }
    }

    public notExistsHandler(model: Model<any>,
                            fieldName: string, from: 'body' | 'query' | 'params' = "body", dbField = "email") {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const fieldValue = req[from][fieldName];

                const item = await model.findOne({[dbField]: fieldValue});
                if (!item) {
                    throw new ApiError(`Record with ${fieldName} ${fieldValue} not exists`, 422);
                }
                req.res.locals.item = item;
                next();
            } catch (e) {
                next(e);
            }
        }
    }
}

export const commonMiddleware = new CommonMiddleware();