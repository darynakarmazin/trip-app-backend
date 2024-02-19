const Joi = require("joi");

const tripSchema = Joi.object({
  city: Joi.string().required(),
  imageUrl: Joi.string().required(),
  startData: Joi.required(),
  endData: Joi.required(),
});

module.exports = tripSchema;
