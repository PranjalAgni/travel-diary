const Query = {
  books(parent, args, { store }, info) {
    console.log({ parent, args, store, info });
    return store;
  }
};

module.exports = Query;
