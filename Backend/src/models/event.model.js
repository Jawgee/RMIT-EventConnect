const Joi = require('joi');

// Define a Joi schema for the Event model
const eventSchema = Joi.object({
  name: Joi.string().max(50).required(),
  owner: Joi.string().max(50).required(),
  URL: Joi.string().max(255),
  sector: Joi.string().valid('Tourism', 'Tech', 'Bio', 'Health', 'Sustainability', 'Agro', 'Fintech', 'GreenTech', 'Mobility', 'Logistic', 'Food', 'Smart Cities', 'Blue Economy', 'Space').required(),
  profile: Joi.string().valid('Entrepreneur', 'Corporate', 'Investor', 'Startup', 'Academy', 'Ecosystem Facilitator', 'Acelerator', 'Incubator', 'SME', 'Agency', 'NGO').required(),
  category: Joi.string().valid('State of the art', 'Round Table', 'Living Test', 'Stand', 'Pitch', 'ShowRoom').required(),
  frequency: Joi.string().valid('Unique', 'Yearly', 'Monthly'),
  environment: Joi.string().valid('Red Carpet', 'Informal', 'Cocktail', 'Party', 'Prize'),
  privacy: Joi.string().valid('public', 'private').required(),
  entrance: Joi.string().valid('Free', 'Paid'),
  accessibility: Joi.string().valid('In-person', 'Online', 'Hybrid'),
  motivation: Joi.string().valid('Validation', 'Investor', 'Partner', 'Scouting'),
  description: Joi.string().required(),
  location: Joi.string().required()

});

module.exports = eventSchema;
module.exports = {
  validateEvent: (event) => eventSchema.validate(event)
};
