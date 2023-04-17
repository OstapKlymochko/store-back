import {IUser, IUserResponse} from "../interfaces";

export const userMapper = (user: IUser): IUserResponse => {
    const { _id, firstName, lastName,
        email, basket, devices} = user;

    return {_id, firstName, lastName, email, basket, devices};

}