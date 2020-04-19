const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredNumber = {
  type: Number,
  required: true
};

const spotLogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },

    visitDate: {
      required: true,
      type: Date
    },

    address: {
      type: String,
      required: true
    },

    latitude: {
      ...requiredNumber,
      unique: true,
      min: -90,
      max: 90
    },

    longitude: {
      ...requiredNumber,
      unique: true,
      min: -180,
      max: 180
    },

    description: String,

    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },

    image: String,

    emoji: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const SpotLog = mongoose.model('SpotLog', spotLogSchema);

module.exports = SpotLog;
