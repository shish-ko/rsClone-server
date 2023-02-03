const Router = require('express');
const authController = require('./authController');
const authRouter = new Router();

authRouter.post('/registration', authController.register );
authRouter.post('/login', authController.login);

module.exports = authRouter;