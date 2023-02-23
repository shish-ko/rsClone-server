const { Schema, model } = require('mongoose');

const customGame = new Schema({
  gameSet: {
    type: [{
      city: { type: String, required: true },
      latLng: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      },
      utc: {type: String, required: true},
      continent: {type: String, required: true},
      picture: {type: Array, required: true},

    }],
    required: true,
    _id: false,
    validate() {
      return this.gameSet.length === 9 
    }
  },
  createdBy: {type: String, required: true},
  createdDate: {type: Number, required: true},
  votes: {type: Number, required: true},
  gameTitle: {type: String, required: true},
  // _id: {type: Schema.ObjectId, select: false},
  __v: {type: Number, select: false},
});


module.exports = model('CustomGames', customGame);
