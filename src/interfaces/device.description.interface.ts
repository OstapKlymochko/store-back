import {UploadedFile} from "express-fileupload";
import {ObjectId} from "mongoose";
import {IUser} from "./user.interface";

export interface IDeviceDesc {
    _id?: string;
    data: string;
    images?: string[] | UploadedFile[] | UploadedFile;
    seller_id: string | ObjectId | IUser;
}