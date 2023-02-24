const customGame = require('../models/CustomGame');

const {ObjectId} = require('mongodb');

class CustomController {
  async setGame(req, res) {
    try{
      const {gameSet, createdBy, createdDate, gameTitle} = req.body;
      const newGame = new customGame({gameSet, createdBy, createdDate, gameTitle, votes: 5})
      await newGame.validate();
      await newGame.save();
      res.status(201).json({message: "Game has been successfully added"});
    } catch (e){
      res.status(400).json({message: "Oops. Something went wrong."});
    }
    
  }
  async getGames(req, res) {
    try {
      const dbCustomGames = await customGame.find();

      res.status(200).json(dbCustomGames);
    } catch (e) {
      res.status(500).json({message: "Interval server error"});
    }
  }
  async setVotes (req, res) {
    try{
      const {_id, increase } = req.body;
      const gameId = new ObjectId(_id);
      const game = await customGame.findOne({_id: gameId});
      if (!game) throw Error();
      if(increase) {
        game.votes += 1;
      } else {
        game.votes -=1;        
      } 
      await game.save();
      if (!game.votes) {
        res.status(200).json({message: "Thank for your voice! Game was deleted", votes: game.votes})
        await game.deleteOne();
        return;
      }
      res.status(200).json({message: "Thank for your voice!", votes: game.votes});
    } catch (e) {
      res.status(400).json({message: "Interval server error"})
    }
  }
}
const customController = new CustomController();
module.exports = customController;
