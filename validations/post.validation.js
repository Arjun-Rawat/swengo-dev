const Joi = require("joi");
const { password } = require("./custom.validation");

const createPost = {
  body: Joi.object().keys({
    postContext: Joi.string().required(),
  }),
};

module.exports = {
  createPost,
};
