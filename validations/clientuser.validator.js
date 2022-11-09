const Joi = require('joi');

const clientUserSchema = Joi.object({
    username: Joi.string().min(8).required().messages({
        'string.base': `username should be a type of 'text'`,
        'string.empty': `username cannot be an empty field`,
        'string.min': `username should have a minimum length of 8 characters`,
        'any.required': `username is a required field`
      }),
    password: Joi.string().min(8).required().messages({
        'string.base': `password should be a type of 'text'`,
        'string.empty': `password cannot be an empty field`,
        'string.min': `password should have a minimum length of 8 characters`,
        'any.required': `password is a required field`
      })
    ,
    name: Joi.string().min(8).max(191).required().messages({
        'string.base': `name should be a type of 'text'`,
        'string.empty': `name cannot be an empty field`,
        'string.min': `name should have a minimum length of 8 characters`,
        'any.required': `name is a required field`
      }),
    email: Joi.string().email().required().messages({
        'string.base': `email should be a type of 'text'`,
        'string.empty': `email cannot be an empty field`,
        'string.min': `email should have a minimum length of 8 characters`,
        'string.email': `email must be a valid one`,
        'any.required': `email is a required field`
      }),
    
});

module.exports = clientUserSchema;