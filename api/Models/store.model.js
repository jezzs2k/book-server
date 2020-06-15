const Store = require('../Schemas/stores.schema');

module.exports.getStore = async (id) => {
  try {
    let store = await Store.findOne({ user: id }).populate('user');

    if (!store) {
      store = await Store.findById(id);
    }

    return store;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.createStore = async (userId) => {
  try {
    const newStore = new Store({
      user: userId,
    });

    await newStore.save();

    return newStore;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.deleteStore = async (storeId) => {
  try {
    const store = await Store.findByIdAndRemove(storeId);

    return store;
  } catch (error) {
    throw new Error(error);
  }
};
