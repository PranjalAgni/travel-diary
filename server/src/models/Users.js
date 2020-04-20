const mongoose = require('mongoose');
const validator = require('validator').default;
const bcrypt = require('bcryptjs');

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
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email provided');
        }
      }
    },
    birthDate: {
      type: Date
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

// helper method when user is trying to login
usersSchema.statics.findByCredentials = async (email, password) => {
  const user = await Users.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

// Hash the plain text password before saving
usersSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
