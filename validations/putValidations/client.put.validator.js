const Joi = require('joi');

const clientSchema = Joi.object({
    business_name: Joi.string().empty().min(8).max(500).messages({
        'string.base': 'bussinesname should be a type of text',
        'string.empty': 'bussinesname cannot be an empty field',
        'string.min': 'bussinesname should have a minimum length of 8 characters',
        'string.max':'bussinesname shuld have a max lenght of 500 characters'
      }),
      domain: Joi.string().empty().min(4).max(45).messages({
        'string.base': 'domain should be a type of text',
        'string.empty': 'domain cannot be an empty field',
        'string.min': 'domain should have at least 4 characters',
        'string.max': 'domain should have a max lenght of 45 characters'
      }),
    email: Joi.string().empty().email().min(8).max(191).messages({
        'string.base': 'email should be a type of text',
        'string.empty': 'email cannot be an empty field',
        'string.min': 'email should have at least 8 characters',
        'string.max': 'email should have a minimum length of 8 characters',
        'string.email': 'email must be a valid one'
      }),
    phone: Joi.string().empty().min(7).max(15).messages({
        'string.base':'phone should be a type of number',
        'string.empty':'phone cannot be an empty field',
        'string.min': 'phone should have at least 7 numbers',
        'string.max': 'phone should have a max length of 15 numbers'
    }),
    nif_cif: Joi.string().alphanum().empty().min(9).max(15).messages({
        'string.base':'nif/cif should be a type of alphanumeric',
        'string.empty':'nif/cif cannot be an empty field',
        'string.min': 'nif/cif should have at least 9 numbers',
        'string.max': 'nif/cif should have a max length of 15 numbers',
    }),
    address:Joi.string().empty().min(7).max(400).messages({
        'string.base':'address should be an string type',
        'string.empty':'address cannot be an empty field',
        'string.min': 'address should have at least 7 characters',
        'string.max': 'address should have a max length of 400 characters',
        'any.required':'address is a required field'
    }),
    country:Joi.string().empty().min(4).max(50).messages({
        'string.base':'country should be a type of string',
        'string.empty':'country cannot be an empty field',
        'string.min': 'country should have at least 4 numbers',
        'string.max': 'country should have a max length of 50 characters'
    }),
    state:Joi.string().empty().min(4).max(100).messages({
        'string.base':'state should be a type of string',
        'string.empty':'state cannot be an empty field',
        'string.min': 'state should have at least 4 characters',
        'string.max': 'state should have a max length of 100 characters'
    }),
    province:Joi.string().empty().min(4).max(100).messages({
        'string.base':'province should be a type of string',
        'string.empty':'province cannot be an empty field',
        'string.min': 'province should have at least 4 characters',
        'string.max': 'province should have a max length of 100 characters'
    }),
    town:Joi.string().empty().min(4).max(100).messages({
        'string.base':'town should be a type of string',
        'string.empty':'town cannot be an empty field',
        'string.min': 'town should have at least 4 characters',
        'string.max': 'town should have a max length of 100 characters'
    }),
});

module.exports = clientSchema;