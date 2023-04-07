import {Router} from "express";

import {authController} from "../controllers";
import {commonMiddleware} from "../middlewares";
import {User} from "../models";
import {userValidator} from "../validators";

const router = Router();


router.post('/register',
    commonMiddleware.isBodyValid(userValidator.createUser),
    commonMiddleware.alreadyExistsHandler(User, "email"),
    authController.register
);

export const authRouter = router;