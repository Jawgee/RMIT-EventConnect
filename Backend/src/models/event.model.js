const Joi = require('joi');

// Define a Joi schema for the Event model
const eventSchema = Joi.object({
  name: Joi.string().max(50).required(),
  owner: Joi.string().max(50).required(),
  sector: Joi.string().valid('tourism', 'tech', 'bio', 'health', 'sustainability', 'agro', 'fintech', 'greentech', 'mobility', 'logistic', 'food', 'smart cities', 'blue economy', 'space').required(),
  profile: Joi.string().valid('entrepreneur', 'corporate', 'investor', 'startup', 'academy', 'ecosystem facilitator', 'accelerator', 'incubator', 'sme', 'agency', 'ngo').required(),
  category: Joi.string().valid('state of the art', 'round table', 'living test', 'stand', 'pitch', 'showroom').required(),
  frequency: Joi.string().valid('unique', 'yearly', 'monthly'),
  environment: Joi.string().valid('red carpet', 'informal', 'cocktail', 'party', 'prize'),
  privacy: Joi.string().valid('public', 'private').required(),
  entrance: Joi.string().valid('free', 'paid'),
  accessibility: Joi.string().valid('in-person', 'online', 'hybrid'),
  motivation: Joi.string().valid('validation', 'investor', 'partner', 'scouting'),
  description: Joi.string().required(),
  location: Joi.string().required()

});

module.exports = eventSchema;
module.exports = {
  validateEvent: (event) => eventSchema.validate(event)
};
