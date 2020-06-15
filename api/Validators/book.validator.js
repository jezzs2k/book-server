const Joi = require('@hapi/joi');

module.exports.joiBookStore = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().required(),
  des: Joi.string(),
  amount: Joi.number(),
  rate: Joi.number(),
});

module.exports.joiBookStoreUpdate = Joi.object({
  title: Joi.string(),
  image: Joi.string(),
  des: Joi.string(),
  amount: Joi.number(),
  rate: Joi.number(),
});
