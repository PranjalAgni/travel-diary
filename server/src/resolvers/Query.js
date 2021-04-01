const Users = require('../models/Users');

const Query = {
  async getUser(parent, args, ctx, info) {
    const user = await Users.findOne({ _id: args.id }).lean();
    return user;
  },

  async getUsers(parent, args, ctx, info) {
    const users = await Users.find().lean();
    return users;
  }
};

module.exports = Query;
