const Joi = require('joi');

const adminAccessSchema = Joi.object({
    username: Joi.string().trim().min(8).max(50).required().messages({
        'string.base': `username should be a type of text`,
        'string.empty': `username cannot be an empty field`,
        'string.min': `username should have a minimum length of 8 characters`,
        'string.max': `username should have at least 50 characters`,
        'string.trim': `username should't have include white spaces`,
        'any.required': `username is a required field`
      }),
    password: Joi.string().trim().min(8).max(50).required().messages({
        'string.base': `password should be a type of text`,
        'string.empty': `password cannot be an empty field`,
        'string.min': `password should have a minimum length of 8 characters`,
        'string.max': `password should have at least 50 characters`,
        'string.trim': `password should't have include white spaces`,
        'any.required': `password is a required field`
      }),
});

module.exports = adminAccessSchema;