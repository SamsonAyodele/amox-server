// USER VALIDATION USING JOI
const Joi = require("joi");

const signUpSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.number().min(0).required(),
  password: Joi.string().required().min(10),
});

const signInSchema = Joi.object({
  email: Joi.number(),
  password: Joi.string(),
});

const validateUserSchema = (data) => {
  const { error, value } = signUpSchema.validate(data);
  return {
    error: error,
    value,
  };
};

const validateSignSchema = (data) => {
  const { error, value } = signInSchema.validate(data);
  return {
    error: error,
    value,
  };
};

module.exports = { validateUserSchema, validateSignSchema };
