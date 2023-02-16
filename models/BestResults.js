const { Schema, model } = require('mongoose');

const BestResult = new Schema({
  username: {type: String, required: true},
  score: {type: Number, required: true},
});

module.exports = model('bestResults', BestResult);
