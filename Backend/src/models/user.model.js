const Joi = require('joi');

const userSchema = Joi.object({
  first_name: Joi.string().min(3).required(),
  last_name: Joi.string().min(3).required(),
  photo: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{7,}$')).required(),
  role: Joi.string()
});

module.exports = userSchema;
module.exports = {
    validateUser: (user) => userSchema.validate(user)
  };