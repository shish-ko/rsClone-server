const customGame = require('../models/CustomGame');

class CustomController {
  async setGame(req, res) {
    try{
      const {gameSet} = req.body;
      const newGame = new customGame({gameSet})
      await newGame.validate();
      await newGame.save();
      console.log(qwe)
      res.status(201).json();
    } catch (e){
      res.status(400).json({message: e})
    }
    
  }
  async getGames(req, res) {
    try {
      const dbCustomGames = await customGame.find();
      const arrCustomGames = dbCustomGames.map(item=> item.gameSet);

      res.status(200).json(arrCustomGames)
    } catch (e) {
      res.status(500).json({message: "Interval server error"})
    }
  }
}
const customController = new CustomController();
module.exports = customController;
