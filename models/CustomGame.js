const { Schema, model } = require('mongoose');

const customGame = new Schema({
  gameSet: {
    type: [{
      city: { type: String, required: true },
      latLng: {
        lat: { type: String, required: true },
        lng: { type: String, required: true }
      }
    }],
    required: true,
    _id: false,
    validate() {
      return this.gameSet.length === 12 
    }
  },
  _id: {type: Schema.ObjectId, select: false},
  __v: {type: Number, select: false},
});


module.exports = model('CustomGames', customGame);
