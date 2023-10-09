const Joi = require('joi');
const subCategories = require('../eventTags.js');

// Define a Joi schema for the Event model
const eventSchema = Joi.object({
    name: Joi.string().max(50).required(),
    owner: Joi.string().max(50).required(),
    sector: Joi.string()
        .valid(...subCategories.sector.tags)
        .required(),
    profile: Joi.string()
        .valid(...subCategories.profile.tags)
        .required(),
    category: Joi.string()
        .valid(...subCategories.category.tags)
        .required(),
    frequency: Joi.string().valid(...subCategories.frequency.tags),
    environment: Joi.string().valid(...subCategories.environment.tags),
    privacy: Joi.string()
        .valid(...subCategories.privacy.tags)
        .required(),
    entrance: Joi.string().valid(...subCategories.entrance.tags),
    accessibility: Joi.string().valid(...subCategories.accessibility.tags),
    motivation: Joi.string().valid(...subCategories.motivation.tags),
    description: Joi.string().required(),
    location: Joi.string().required(),
});

module.exports = eventSchema;
module.exports = {
    validateEvent: (event) => eventSchema.validate(event),
};
