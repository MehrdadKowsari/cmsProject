const joi = require("joi");

const addUserValidationSchema = joi.object({
     userName: joi.string().alphanum().min(3).max(50).trim(true).required(),
     firstName: joi.string().alphanum().min(3).max(50).trim(true),
     lastName: joi.string().alphanum().min(3).max(50).trim(true),
     email: joi.string().email().trim(true).required(),
     password: joi.string().min(8).trim(true).required(),
     confirmPassword: joi.string().min(8).trim(true).required(),
});