import {Router} from "express";

import {authMiddleware, commonMiddleware, deviceMiddleware, fileMiddleware} from "../middlewares";
import {deviceController} from "../controllers";

const router = Router();

router.post('/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkStatus,
    fileMiddleware.isFileValid,
    deviceMiddleware.DeviceValidator,
    deviceController.createDevice
)
router.get('/', deviceController.getAll)

router.get('/images', deviceController.getImg)

router.get('/:deviceId', commonMiddleware.isIdValid('deviceId'), deviceController.getById)


export const deviceRouter = router;
