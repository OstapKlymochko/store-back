import {Request, NextFunction, Response} from "express";
import {IUserResponse} from "../interfaces";
import {User} from "../models";

class UserController {
    public async getById(req: Request, res: Response, next: NextFunction): Promise<Response<IUserResponse>> {
        try {
            const {userId} = req.params;

            const user = await User.findById(userId).populate('devices').select(['-password', '-status']);

            return res.json(user);

        } catch (e) {
            next(e);
        }
    }

}

export const userController = new UserController();