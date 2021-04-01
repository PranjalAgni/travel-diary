const Users = require('../models/Users');

const Mutation = {
  async createUser(parent, args, ctx) {
    const user = new Users(args.data);
    const createdUser = await user.save();
    return createdUser.toObject();
  }
};

module.exports = Mutation;
