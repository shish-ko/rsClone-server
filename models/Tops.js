const {Schema, model} = require('mongoose');

const Scores = new Schema({
  userId: {type: String, unique: true, required: true},
  topScores: {type: [{type: String}], required: true}
})

module.exports = model('Scores', Scores);
