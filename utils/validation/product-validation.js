const isEmpty = require("../is-empty");

module.exports = data => {
  let errors = {};
  if (isEmpty(data.title)) {
    errors.title = "You will need a title";
  }
  if (isEmpty(data.price)) {
    errors.price = "You will need to provide a price";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
