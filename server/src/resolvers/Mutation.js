const Mutation = {
  createBook(parent, args, { store }) {
    const { author, title } = args.data;
    store.push({
      id: store.length + 1,
      author,
      title
    });
    return store[store.length - 1];
  }
};

module.exports = Mutation;
