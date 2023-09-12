const Joi = require('joi');

// Define a Joi schema for the User model
const userSchema = Joi.object({
  first_name: Joi.string().min(3).required(),
  last_name: Joi.string().min(3).required(),
  photo: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{7,}$')).required(),
  profile: Joi.string().valid(
    'Entrepreneur', 'Corporate', 'Investor', 'Startup',
    'Academy', 'Ecosystem Facilitator', 'Acelerator',
    'Incubator', 'SME', 'Agency', 'NGO'
  ).required(),
});

module.exports = {
  userSchema,
  validateUser: (user) => userSchema.validate(user),
};
