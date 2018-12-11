const isEmpty = require("../is-empty");

module.exports = data => {
  let errors = {};
  if (isEmpty(data.comment)) {
    errors.comment = "You will need to provider comment";
  }
  if (isEmpty(data.productId)) {
    errors.productId = "You will need to provide a product Id";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
