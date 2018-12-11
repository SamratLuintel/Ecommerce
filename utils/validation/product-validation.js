const isEmpty = require("../is-empty");

module.exports = data => {
  let errors = {};
  if (isEmpty(data.title)) {
    errors.title = "You will need a title";
  }

  if (isNaN(parseInt(data.price))) {
    errors.price = "You will need to provide a number";
  }
  if (isEmpty(data.price)) {
    errors.price = "You will need to provide a price";
  }
  if (isEmpty(data.category)) {
    errors.category = "You will need to select a category";
  }
  if (isEmpty(data.details)) {
    errors.details = "You will need to provide a details";
  }

  if (isEmpty(data.desc)) {
    errors.desc = "You will need to provide a description";
  }

  if (data.images.length === 0) {
    errors.images = "You will need to provide at least one images";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
