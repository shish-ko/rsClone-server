const Router = require('express');
const {getScore, setScore} = require('./scoreController');
const scoreRouter = new Router();

scoreRouter.post('/', setScore );
scoreRouter.get('/', getScore);

module.exports = scoreRouter;