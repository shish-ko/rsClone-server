const jwt = require('jsonwebtoken');
const SECRET_WORD = require('../constants');
const Scores = require('../models/Tops');
const User = require('../models/User');
const BestResult = require('../models/BestResults');

const { ObjectId } = require('mongodb');


async function getScore(req, res) {
  try {
    const token = req.headers.authorization;
    const { order, get } = req.body;
    const payload = jwt.verify(token, SECRET_WORD);
    const { userId } = payload;
    // const user = await Scores.findOne({ userId });
    function sortHandler() {
      if(order === "ASC" && get === "score") return {"topScores.score": 1};
      else if(order === "DESC" && get === "score") return {"topScores.score": -1};
      else if(order === "ASC" && get === "date") return {"topScores.date": 1};
      else return {"topScores.date": -1};
    }
    const user = await Scores.aggregate([
      {
        $match: {
          userId: userId
        }
      },
      {
        $unwind: "$topScores"
      },
      {
        $sort: sortHandler()
      },
      {
        $group: {
          _id: "$_id",
          topScores: {
            $push: "$topScores"
          }
        }
      }
    ]);

    res.status(200).json({ scoreArr: user[0].topScores })
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: "Invalid token or token has expired." })
    }
  }

}
async function setScore(req, res) {
  try {
    const token = req.headers.authorization;
    const { score, date } = req.body;
    if (!score) {
      return res.status(400).json({ message: "No score is provided" })
    }
    const payload = jwt.verify(token, SECRET_WORD);
    const { userId } = payload;
    const user = await Scores.findOne({ userId });

    user.totalScore += Number(score);
    user.topScores.push({score, date});
    setTopScore(userId, score);
    await user.save();
    return res.status(201).json({ totalScore: user.totalScore });

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