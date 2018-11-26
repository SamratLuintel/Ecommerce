const isEmpty = require("../is-empty");

module.exports = ValidatePage = data => {
  let errors = {};
  if (isEmpty(data.title)) {
    errors.title = "You will need a title";
  }
  if (isEmpty(data.content)) {
    errors.content = "You will need to provide a content";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
