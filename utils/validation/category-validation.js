const isEmpty = require("../is-empty");

module.exports = ValidateCategory = data => {
  let errors = {};
  if (isEmpty(data.title)) {
    errors.title = "You will need a title";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
