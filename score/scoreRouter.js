const Router = require('express');
const {getScore, setScore} = require('./scoreController');
const scoreRouter = new Router();

scoreRouter.post('/set', setScore );
scoreRouter.post('/get', getScore);

module.exports = scoreRouter;