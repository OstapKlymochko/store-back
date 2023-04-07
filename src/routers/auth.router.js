const router = require('express').Router();

const userValidator = require('../validators/user.validator');
const User = require('../models/User.model');
const cmnMdlwr = require('../middlewares/common.middleware');
const authController = require('../controllers/auth.controller');

router.post('/register',
    cmnMdlwr.isBodyValid(userValidator.createUser),
    cmnMdlwr.alreadyExistsHandler(User, "email"),
    authController.register
);

module.exports = router;