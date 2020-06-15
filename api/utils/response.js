module.exports.success = ({ data, message }) => {
  return {
    data: data,
    success: true,
    errorCode: 0,
    message: message || '',
  };
};

module.exports.err = ({ message, errorCode }) => {
  return {
    success: false,
    errorCode,
    message: message || '',
    data: null,
  };
};
