const {
  getBooks,
  createBook,
  deleteBook,
  updateBook,
} = require('../Models/book.model');
const { success, err } = require('../utils/response');
const { CommonError } = require('../common/error');
const {
  joiBookStore,
  joiBookStoreUpdate,
} = require('../Validators/book.validator');

module.exports.getBooks = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;

    if (page === 0) {
      page = 1;
    }
    const perPage = 8;
    const start = (page - 1) * perPage;
    const end = (page - 1) * perPage + perPage;

    const books = await getBooks(end, start);
    res.jsonp(
      success({
        data: {
          books,
        },
      })
    );
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.createBook = async (req, res) => {
  try {
    const { error, value } = joiBookStore.validate(req.body);

    if (error) {
      console.log(error.message);
      return res.jsonp(err(CommonError.INVALID_INPUT_PARAMS));
    }

    const book = await createBook(req.body, req.user.userId);

    res.jsonp(success({ data: { book } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.deleteBook = async (req, res) => {
  try {
    const book = await deleteBook(req.params.id);

    res.jsonp(success({ data: { book } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.updateBook = async (req, res) => {
  try {
    const { error, value } = joiBookStoreUpdate.validate(req.body);
    if (error) {
      console.log(error.message);
      return res.jsonp(err(CommonError.INVALID_INPUT_PARAMS));
    }

    const book = await updateBook(req.params.id, req.body);
    res.jsonp(success({ data: { book } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};
