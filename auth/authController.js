const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Scores = require('../models/Tops');
const SECRET_WORD = require('../constants');

class AuthController {
  async register (req, res) {
    try {      
      const {username, password} = req.body;
      const candidate = await User.findOne({username})
      if(candidate) {
        return res.status(400).json({message: "Username is exist"});
      }
      const hashedPassword = await bcrypt.hash(password, 4);
      const user = new User({username, password: hashedPassword});
      await user.save();
      const userScore = new Scores({userId: user._id, topScores:[]});
      await userScore.save();
      res.status(201).json({message: 'New user was added'})
    } catch (e) {
      res.status(500).json({message: "Oops, something went wrong"});
    }
  }

  async login (req, res) {
    try {
      const {username, password} = req.body;
      const user = await User.findOne({username})
      console.log(user._id)
      if(!user) {
       return res.status(400).json({message: "No user find with provided username"});
      }
      const isPasswordRight = await bcrypt.compare(password, user.password);
      if (!isPasswordRight) {
        return res.status(400).json({message: "Invalid password!"})
      }
      const token = jwt.sign({userId: user._id}, SECRET_WORD, {expiresIn: "24h"});
      const userScores = await Scores.findOne({userId: user._id});
      const topScores = userScores.topScores;
      res.json({token, topScores});
    } catch (e) {
      res.status(500).json({message: "Interval server error"})
    }
  }

}
const authController = new AuthController ();
module.exports = authController;
