const Router = require('express');
const scoreController = require('./scoreController');
const scoreRouter = new Router();

scoreRouter.post('/', scoreController.setScore );
scoreRouter.get('/', scoreController.getScore);

module.exports = scoreRouter;