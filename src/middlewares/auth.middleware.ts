import {NextFunction, Request, Response} from "express";

import {ApiError} from "../error";
import {ActionToken, Token} from "../models";
import {tokenServices} from "../services";
import {EActionTypes, ETokenTypes} from "../enums";

class AuthMiddleware {
    public async checkAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get('Authorization');

            const jwtPayload = tokenServices.checkToken(accessToken);

            const tokenInfo = await Token.findOne({accessToken});

            if (!tokenInfo) {
                throw new ApiError('Invalid Token', 401);
            }

            req.res.locals = {...req.res.locals, jwtPayload, tokenInfo};

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get('Authorization');
            const jwtPayload = tokenServices.checkToken(refreshToken, ETokenTypes.refresh);
            const tokenInfo = await Token.findOne({refreshToken});
            if (!tokenInfo) {
                throw new ApiError('Invalid Token', 401);
            }
            req.res.locals = {...req.res.locals, jwtPayload, tokenInfo};
            console.log(jwtPayload);
            next();
        } catch (e) {
            next(e);
        }
    }

    public checkActionToken(tokenType: EActionTypes) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const {token} = req.params;
                const jwtPayload = tokenServices.checkActionToken(token, tokenType);

                const tokenInfo = await ActionToken.findOne({token});

                if (!tokenInfo) {
                    throw new ApiError('Invalid Token', 400);
                }

                req.res.locals = {...req.res.locals, jwtPayload, tokenInfo};

                next();
            } catch (e) {
                next(e);
            }
        }
    }
}

export const authMiddleware = new AuthMiddleware();