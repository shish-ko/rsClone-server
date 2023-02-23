const customGame = require('../models/CustomGame');

class CustomController {
  async setGame(req, res) {
    try{
      const {gameSet, createdBy, createdDate, gameTitle} = req.body;
      console.log(gameSet)
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
}
const customController = new CustomController();
module.exports = customController;
