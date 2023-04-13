import {Router} from "express";

import {authController} from "../controllers";
import {commonMiddleware, authMiddleware} from "../middlewares";
import {EActionTypes} from "../enums";
import {User} from "../models";
import {userValidator} from "../validators";

const router = Router();


router.post('/register',
    commonMiddleware.isBodyValid(userValidator.createUser),
    commonMiddleware.alreadyExistsHandler(User, "email"),
    authController.register
);
router.put('/activate/:token', authMiddleware.checkActionToken(EActionTypes.activate), authController.activate);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh)

router.post('/login',
    commonMiddleware.isBodyValid(userValidator.login),
    commonMiddleware.notExistsHandler(User, "email"),
    authController.login
);

export const authRouter = router;