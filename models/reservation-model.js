const mongoose = require("mongoose"); 

const reversationSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant",
  },

  numberAdult: {
    type: Number,
    required: true,
  },
  numberChildren: {
    type: Number,
    required: true,
  },
  dateArrival: {
    type: Date,
    required: true,
  },
  hourArrival: {
    type: String,
    required: true,
  },

  nameContact: {
    type: String,
    required: true,
  },

  numberContact: {
    type: String,
    required: true,
  },
  EmailContact: {
    type: String,
    required: true,
  },
  note: {
    type: String, 
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  }, 
});

const Reversation = mongoose.model("Reversation", reversationSchema);

module.exports = Reversation;
