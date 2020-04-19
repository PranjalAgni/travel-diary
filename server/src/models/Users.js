const mongoose = require('mongoose');
const validator = require('validator').default;

const { Schema } = require('mongoose');

const requiredTrimString = {
  type: String,
  required: true,
  trim: true
};

const usersSchema = new Schema(
  {
    name: {
      ...requiredTrimString,
      validate(value) {
        if (validator.isEmpty(value)) {
          throw new Error('Invalid name is provided');
        }
      }
    },
    password: {
      ...requiredTrimString,
      minlength: 4,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain password');
        }
      }
    },
    email: {
      ...requiredTrimString,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email provided');
        }
      }
    },
    birthDate: {
      type: Date,
      validate(value) {
        if (!validator.isISO8601(value)) {
          throw new Error('Invalid date provided');
        }
      }
    },
    spots: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SpotLog'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
