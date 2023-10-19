const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const {checkFollowedIdSchema} = require('../validators/user-validator')

exports.requestToBeFollowing = async (req, res, next) => {
  try {
    const { error, value } = checkFollowedIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }
    if (value.followedId === req.user.id) {
      return next(createError("Unable to follow yourself", 400));
    }
    const targetUser = await prisma.user.findUnique({
      where: {
        id: value.followedId,
      },
    });
    if (!targetUser) {
      return next(createError("User does not exist", 400));
    }

    const existFollowed = await prisma.followInfo.findFirst({
      where: {
       followerId: req.user.id,
       followedId: value.followedId,

      }
    });
    if (existFollowed) {
      return next(createError("Already following", 400));
    }

    await prisma.followInfo.create({
      data: {
        followerId: req.user.id,
        followedId: value.followedId,
      },
    });
    res.status(201).json({ message: "following this user" });
  } catch (err) {
    next(err);
  }
};
