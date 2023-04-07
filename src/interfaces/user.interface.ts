import {EStatus} from "../enums";

export interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    basket?: string;
    status?: EStatus;
}