"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
const validators_1 = require("../validators");
const router = (0, express_1.Router)();
router.post('/register', middlewares_1.commonMiddleware.isBodyValid(validators_1.userValidator.createUser), middlewares_1.commonMiddleware.alreadyExistsHandler(models_1.User, "email"), controllers_1.authController.register);
exports.authRouter = router;
