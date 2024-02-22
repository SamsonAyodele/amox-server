const Joi = require("joi");

const menuSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
});

const validateMenuSchema = (data) => {
  const { error, value } = menuSchema.validate(data);
  return {
    error: error,
    value,
  };
};

module.exports = { validateMenuSchema };
