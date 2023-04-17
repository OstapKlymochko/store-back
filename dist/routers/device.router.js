"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', middlewares_1.authMiddleware.checkAccessToken, middlewares_1.authMiddleware.checkStatus, middlewares_1.deviceMiddleware.DeviceValidator, controllers_1.deviceController.createDevice);
router.get('/', controllers_1.deviceController.getAll);
router.get('/images', controllers_1.deviceController.getImg);
router.get('/:deviceId', middlewares_1.commonMiddleware.isIdValid('deviceId'), controllers_1.deviceController.getById);
exports.deviceRouter = router;
