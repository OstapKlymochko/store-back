import {EStatus} from "../enums";
import {IDevice} from "./device.interface";

export interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    basket?: string | { _id: string, items: string[] };
    status?: EStatus;
    devices?: IDevice[];
}

export type IUserResponse = Omit<IUser, 'password' | 'status'>