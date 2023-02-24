const Router = require('express');

const customController = require('./customController');

const customGameRouter= new Router();

customGameRouter.post('/', customController.setGame);
customGameRouter.get('/', customController.getGames);
customGameRouter.patch('/', customController.setVotes);

module.exports = customGameRouter;