import {NextFunction, Request, Response} from "express";

import {authServices} from '../services';
import {basketServices} from '../services';

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
}

export const authController = new AuthController();