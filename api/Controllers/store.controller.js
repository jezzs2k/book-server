const { getStore, createStore, deleteStore } = require('../Models/store.model');
const { success, err } = require('../utils/response');
const { CommonError } = require('../common/error');

module.exports.getStore = async (req, res) => {
  try {
    const store = await getStore(req.user.userId);

    res.jsonp(success({ data: { store } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.getStoreById = async (req, res) => {
  try {
    const store = await getStore(req.params.storeId);

    res.jsonp(success({ data: { store } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.createStore = async (req, res) => {
  try {
    const store = await createStore(req.user.userId);

    res.jsonp(success({ data: { store } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.deleteStore = async (req, res) => {
  try {
    const store = await deleteStore(req.params.storeId);

    res.jsonp(success({ data: { store } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};
