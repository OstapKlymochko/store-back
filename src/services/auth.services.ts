import bcrypt from "bcrypt";

import {ActionToken, Token, User} from "../models";
import {ApiError} from "../error";
import {ITokenPair, ITokenPayload, IUser} from "../interfaces";
import {tokenServices} from "./token.services";
import {emailServices} from "./email.services";
import {EActionTypes, EEmailActions} from "../enums";

class AuthServices {
    public async register(user: IUser) {
        try {
            const {email, password, firstName, lastName} = user;
            const hashedPassword = await bcrypt.hash(password, 5);

            const newUser = await User.create({
                ...user,
                password: hashedPassword
            });

            const token = tokenServices.generateActionToken({_id: newUser._id.toString(), firstName, lastName});

            await Promise.all([
                ActionToken.create({user: newUser._id, token, action_type: EActionTypes.activate}),
                emailServices.sendMail(email, EEmailActions.ACTIVATE,
                    {username: `${firstName} ${lastName}`, token})
            ]);
            return newUser;
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async login(password: string, user: IUser): Promise<ITokenPair> {
        try {
            const compareRes = await bcrypt.compare(password, user.password);

            if (!compareRes) {
                throw new ApiError('Wrong Email or Password', 400);
            }
            const tokenPair = tokenServices.generateTokenPair({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName
            });
            const exists = await Token.exists({user: user._id});
            if (exists) {
                await Token.findOneAndUpdate({user: user._id}, {
                    $set: {
                        accessToken: tokenPair.accessToken,
                        refreshToken: tokenPair.refreshToken
                    }
                });
            } else {
                await Token.create({user: user._id, ...tokenPair});
            }
            return tokenPair;
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async refresh(tokenInfo: ITokenPair, {_id, firstName, lastName}: ITokenPayload): Promise<ITokenPair> {
        try {
            const tokenPair = tokenServices.generateTokenPair({_id, firstName, lastName});
            await Token.findByIdAndUpdate(tokenInfo._id, {
                accessToken: tokenPair.accessToken,
                refreshToken: tokenPair.refreshToken
            });
            return tokenPair
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const authServices = new AuthServices();