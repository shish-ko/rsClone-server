const jwt = require('jsonwebtoken');
const SECRET_WORD = require('../constants');
const Scores = require('../models/Tops');

class ScoreController {
  async getScore(req, res) {
    try {
      const token = req.headers.authorization;
      const payload = jwt.verify(token, SECRET_WORD);
      const { userId } = payload;
      const user = await Scores.findOne({ userId });
      if (!user) {
        return res.status(200).json({ topScores: [] })
      }
      res.status(200).json({ topScores: user.topScores })
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        return res.status(400).json({ message: "Invalid token or token has expired." })
      }
    }

  }
  async setScore(req, res) {
    try {
      const token = req.headers.authorization;
      const newScore = req.body.score;
      if(!newScore) {
        return res.status(400).json({message: "No score is provided"})
      }
      const payload = jwt.verify(token, SECRET_WORD);
      const { userId } = payload;
      const user = await Scores.findOne({ userId });

      user.topScores.push(newScore);
      console.log(user.topScores)
      await user.save();
      return res.status(201).json({ topScores: user.topScores });

    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        return res.status(400).json({ message: "Token has expired. Try to login once again." });
      }
      res.status(500).json({ message: "Interval server error." });
    }
  }
}
const scoreController = new ScoreController()
module.exports = scoreController;