const mongoose = require("mongoose"); 

const restaurantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
  },

  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  priceStart: {
    type: Number,
  },
  priceEnd: {
    type: Number,
  },

  thumbnail: {
    type: [String],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
