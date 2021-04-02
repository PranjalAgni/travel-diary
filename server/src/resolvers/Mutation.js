const Users = require('../models/Users');

const Mutation = {
  async createUser(parent, args, ctx) {
    const user = new Users(args.data);
    const createdUser = await user.save();
    return createdUser.toObject();
  },

  async login(parent, args, ctx, info) {
    const user = await Users.findByCredentials(
      args.data.email,
      args.data.password
    );

    const token = await user.generateAuthToken();
    console.log('Token:', token);
    return user;
  }
};

module.exports = Mutation;
