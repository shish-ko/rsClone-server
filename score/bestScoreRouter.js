const Router = require('express');
const BestResult = require('../models/BestResults')

const bestScoreRouter = Router();

bestScoreRouter.get('/', async (req, res)=>{
  const results = await BestResult.find().sort({"score": -1});
  res.json({results})
});

module.exports = bestScoreRouter;
