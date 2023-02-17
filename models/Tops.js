const {Schema, model} = require('mongoose');

const Scores = new Schema({
  userId: {type: String, unique: true, required: true},
  topScores: {type: [{score: {type: String, required: true}, date: {type: Number}}], required: true}
})

module.exports = model('Scores', Scores);
