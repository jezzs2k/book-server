const Book = require('../Schemas/book.schema');

module.exports.getBooks = async (end, start) => {
  try {
    const books = await Book.find().limit(end - start);
    return books;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.createBook = async (data, userId) => {
  try {
    const book = new Book({
      ...data,
      userId,
    });

    await book.save();
    return book;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.deleteBook = async (id) => {
  try {
    const checkBook = await Book.findById(id);

    if (!checkBook) {
      throw new Error("Book didn't exist");
    }

    const book = await Book.findOneAndDelete({ _id: id });
    return book;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.updateBook = async (id, data) => {
  try {
    const checkBook = await Book.findById(id);

    if (!checkBook) {
      throw new Error("Book didn't exist");
    }

    await Book.findOneAndUpdate({ _id: id }, { ...data });

    const book = await Book.findById(id);
    return book;
  } catch (error) {
    throw new Error(error);
  }
};
