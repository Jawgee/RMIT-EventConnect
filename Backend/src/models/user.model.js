const Joi = require('joi');
const subCategories = require('../eventTags.js');

// Define a Joi schema for the User model
const userSchema = Joi.object({
    first_name: Joi.string().min(3).max(20).required(),
    last_name: Joi.string().min(3).max(20).required(),
    photo: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{7,}$')).required().max(20),
    profile: Joi.string()
        .valid(...subCategories.profile.tags)
        .required(),
});
const updateUserSchema = Joi.object({
    first_name: Joi.string().min(3).max(20),
    last_name: Joi.string().min(3).max(20),
    photo: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{7,}$')).max(20),
    profile: Joi.string().valid(...subCategories.profile.tags),
});

module.exports = {
    userSchema,
    validateUser: (user) => userSchema.validate(user),
    validateUpdateUser: (user) => updateUserSchema.validate(user),
};
