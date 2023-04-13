import {Router} from "express";
import {authMiddleware, deviceMiddleware} from "../middlewares";
import {deviceController} from "../controllers";

const router = Router();

// router.get('/')

router.post('/', authMiddleware.checkAccessToken,
    authMiddleware.checkStatus,
    deviceMiddleware.DeviceValidator,
    deviceController.createDevice
)

export const deviceRouter = router;
