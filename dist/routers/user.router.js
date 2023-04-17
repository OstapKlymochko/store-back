"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get('/:userId', middlewares_1.commonMiddleware.isIdValid('userId'), user_controller_1.userController.getById);
exports.userRouter = router;
