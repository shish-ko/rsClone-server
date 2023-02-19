const { Schema, model } = require('mongoose');

const Scores = new Schema({
  userId: { type: String, unique: true, required: true },
  totalScore: {type: Number, default: 0},
  topScores: { type: [{ 
    score: { type: Number, required: true }, 
    date: { type: Number } 
  }],
  required: true,
  _id: false }
})

module.exports = model('Scores', Scores);
