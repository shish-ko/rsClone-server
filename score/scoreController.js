const jwt = require('jsonwebtoken');
const SECRET_WORD = require('../constants');
const Scores = require('../models/Tops');
const User = require('../models/User');
const BestResult = require('../models/BestResults');

const { ObjectId } = require('mongodb');


async function getScore(req, res) {
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
async function setScore(req, res) {
  try {
    const token = req.headers.authorization;
    const newScore = req.body.score;
    if (!newScore) {
      return res.status(400).json({ message: "No score is provided" })
    }
    const payload = jwt.verify(token, SECRET_WORD);
    const { userId } = payload;
    const user = await Scores.findOne({ userId });

    user.topScores.push(newScore);
    setTopScore(userId, newScore);
    await user.save();
    return res.status(201).json({ topScores: user.topScores });

  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(400).json({ message: "Token has expired. Try to login once again." });
    }
    res.status(500).json({ message: "Interval server error." });
  }
}
async function setTopScore(userId, score) {
  const u_id = new ObjectId(userId)
  const { username } = await User.findOne({ _id: u_id });
  const res = await BestResult.findOneAndReplace(
    { "score": { $lt: score } },
    { "username": username, "score": score },
    { sort: { "score": 1 } }
  )
}


module.exports = { getScore, setScore };