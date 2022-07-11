const Joi = require('joi');

const quote = Joi.object({
    text: Joi.string().required().max(256),
    authorId: Joi.number().required().min(1)
})


module.exports = quote;