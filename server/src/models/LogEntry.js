const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredNumber = {
  type: Number,
  required: true
};

const logEntrySchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String,
    comments: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    image: String,
    visitDate: {
      required: true,
      type: Date
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
    }
  },
  {
    timestamps: true
  }
);

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;
