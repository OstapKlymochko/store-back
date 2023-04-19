import {Request, NextFunction, Response} from "express";
import {UploadedFile} from "express-fileupload";
import {fileConstants} from "../constants";
import {ApiError} from "../error";

class FileMiddleware {
    public isFileValid(req: Request, res: Response, next: NextFunction): void {
        try {
            const file = req.files;
            if (Object.keys(file).length === 0) {
                return next();
            }
            for (const value in file) {
                if (Array.isArray(file[value])) {
                    // @ts-ignore
                    for (const val of file[value]) {
                        FileMiddleware.checkFile(val);
                    }
                    continue;
                }
                FileMiddleware.checkFile(file[value] as UploadedFile);
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    public static checkFile(file: UploadedFile): void {
        const {size, mimetype} = file;
        if (size > fileConstants.size) {
            throw new ApiError('The file is too big', 400);
        }
        if (!fileConstants.mimetypes.includes(mimetype)) {
            throw new ApiError('Invalid type', 400);
        }
    }
}

export const fileMiddleware = new FileMiddleware();