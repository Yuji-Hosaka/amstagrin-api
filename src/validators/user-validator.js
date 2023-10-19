const Joi = require("joi");

const checkUserIdSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
});

exports.checkUserIdSchema = checkUserIdSchema;

const checkFollowedIdSchema = Joi.object({
  followedId: Joi.number().integer().positive().required(),
});

exports.checkFollowedIdSchema = checkFollowedIdSchema;
