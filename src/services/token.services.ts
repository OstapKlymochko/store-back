import * as jwt from 'jsonwebtoken';

import {ITokenPair, ITokenPayload} from "../interfaces";
import {configs} from "../configs";
import {EActionTypes, ETokenTypes} from "../enums";
import {ApiError} from "../error";

class TokenServices {
    public generateTokenPair(payload: ITokenPayload): ITokenPair {

        const accessToken = jwt.sign(payload, configs.ACCESS_SECRET, {
            expiresIn: '7d'
        });

        const refreshToken = jwt.sign(payload, configs.REFRESH_SECRET, {
            expiresIn: '21d'
        });

        return {
            accessToken,
            refreshToken
        }
    }


    public checkToken(token: string, tokenType = ETokenTypes.access): ITokenPayload {
        try {
            let secret;
            switch (tokenType) {
                case ETokenTypes.access:
                    secret = configs.ACCESS_SECRET;
                    break;
                case ETokenTypes.refresh:
                    secret = configs.REFRESH_SECRET;
                    break;
            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public generateActionToken(payload: ITokenPayload, tokenType = EActionTypes.activate) {
        return jwt.sign(payload, tokenType, {
            expiresIn: '1h'
        });
    }

    public checkActionToken(token: string, tokenType = EActionTypes.activate) {
        return jwt.verify(token, tokenType);
    }
}

export const tokenServices = new TokenServices();