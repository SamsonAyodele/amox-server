// PRODUCT VALIDATION USING JOI
const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.number().min(0).required(),
  password: Joi.string().required().min(10),
});

const userUpdateSchema = Joi.object({
  email: Joi.number(),
  password: Joi.string(),
});

module.exports = {userSchema, userUpdateSchema}