const Joi = require('joi');

const clientUserNoAdminPutSchema = Joi.object({
    username: Joi.string().min(8).messages({
        'string.base': `username should be a type of text`,
        'string.empty': `username cannot be an empty field`,
        'string.min': `username should have a minimum length of 8 characters`,
      }),
    password: Joi.string().min(8).messages({
        'string.base': `password should be a type of text`,
        'string.empty': `password cannot be an empty field`,
        'string.min': `password should have a minimum length of 8 characters`,
      })
    ,
    name: Joi.string().min(8).max(191).messages({
        'string.base': `name should be a type of text`,
        'string.empty': `name cannot be an empty field`,
        'string.min': `name should have a minimum length of 8 characters`,
      }),
    email: Joi.string().email().messages({
        'string.base': `email should be a type of text`,
        'string.empty': `email cannot be an empty field`,
        'string.min': `email should have a minimum length of 8 characters`,
        'string.email': `email must be a valid one`,
      }),
});

module.exports = clientUserNoAdminPutSchema;