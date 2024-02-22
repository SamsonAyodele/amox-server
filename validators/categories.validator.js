const Joi = require("joi");

const categoriesSchema = Joi.object({
  name: Joi.string().required(),
});

const validateCategories = (data) => {
  const { error, value } = categoriesSchema.validate(data);
  return {
    error: error,
    value,
  };
};

module.exports = { validateCategories };
