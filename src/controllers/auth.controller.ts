import {NextFunction, Request, Response} from "express";

import {authServices} from '../services';
import {basketServices} from '../services';
import {ITokenPair} from "../interfaces";
import {ActionToken, User} from "../models";
import {EStatus} from "../enums";

// import {EStatus} from "../enums";

class AuthController {
    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const basketId = await basketServices.createBasket();
            const user = await authServices.register({...req.body, basket: basketId});
            return res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<Response<ITokenPair>> {
        try {
            const {password} = req.body;
            const {item: user} = req.res.locals;
            const tokenPair = await authServices.login(password, user);

            return res.json(tokenPair);
        } catch (e) {
            next(e);
        }
    }

    public async activate(req: Request, res: Response, next: NextFunction): Promise<Response<number>> {
        try {

            const {tokenInfo} = req.res.locals;

            await Promise.all([
                User.findByIdAndUpdate(tokenInfo.user, {$set: {status: EStatus.activated}}),
                ActionToken.findByIdAndDelete(tokenInfo._id)
            ]);

            return res.sendStatus(200);

        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {tokenInfo, jwtPayload} = req.res.locals;
            const tokenPair = await authServices.refresh(tokenInfo, jwtPayload);
            return res.json(tokenPair);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();