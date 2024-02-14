// USER VALIDATION USING JOI
const Joi = require("joi");

const userSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.number().min(0).required(),
  password: Joi.string().required().min(10),
});

// const userUpdateSchema = Joi.object({
//   email: Joi.number(),
//   password: Joi.string(),
// });

const validateUserSchema = (data) => {
  const { error, value } = userSchema.validate(data);
  return {
    error: error,
    value,
  };
};

module.exports = { validateUserSchema: validateUserSchema };
