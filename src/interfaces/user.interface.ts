import {EStatus} from "../enums";
import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    basket?: string | { _id: string, items: string[] };
    status?: EStatus;
}