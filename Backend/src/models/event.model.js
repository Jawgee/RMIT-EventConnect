const Joi = require('joi');

// Define a Joi schema for the Event model
const eventSchema = Joi.object({
  name: Joi.string().required().max(255),
  owner: Joi.string().required().max(255),
  privacy: Joi.string().valid('public', 'private').required(),
  description: Joi.string().required().max(255),
  location: Joi.string().required().max(255),
});

module.exports = eventSchema;
module.exports = {
    validateEvent: (event) => eventSchema.validate(event)
  };