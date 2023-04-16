import {Router} from "express";
import {authMiddleware, commonMiddleware, deviceMiddleware} from "../middlewares";
import {deviceController} from "../controllers";

const router = Router();

// router.get('/')

router.post('/', authMiddleware.checkAccessToken,
    authMiddleware.checkStatus,
    deviceMiddleware.DeviceValidator,
    deviceController.createDevice
)

router.get('/', deviceController.getAll)

router.get('/:deviceId', commonMiddleware.isIdValid('deviceId'), deviceController.getById)

router.get('/:deviceId/:imgPath',commonMiddleware.isIdValid('deviceId'), deviceController.getImg)

export const deviceRouter = router;
