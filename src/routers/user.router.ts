import {Router} from "express";
import {commonMiddleware} from "../middlewares";
import {userController} from "../controllers/user.controller";

const router = Router();

router.get('/:userId', commonMiddleware.isIdValid('userId'), userController.getById)

export const userRouter = router;