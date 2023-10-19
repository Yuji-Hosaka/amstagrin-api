const createError = require("../utils/create-error");
const prisma = require("../models/prisma");
const { upload } = require("../utils/cloudinary-server");
const fs = require("fs/promises");
const { checkPostIdSchema } = require("../validators/post-validator");

exports.createPost = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(createError("An image is required", 400));
    }
    const data = { userId: req.user.id };
    if (req.file) {
      data.photo = await upload(req.file.path);
    }
    const { caption } = req.body;
    if (caption) {
      data.caption = caption;
    }
    await prisma.post.create({ data: data });
    res.status(201).json({ caption: "Post created" });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { value, error } = checkPostIdSchema.validate(req.params);
    if (error) {
      return next(error);
    }

    const existPost = await prisma.post.findFirst({
      where: {
        id: value.postId,
        userId: req.user.id,
      },
    });

    if (!existPost) {
      return next(createError("Unable to delete this post", 400));
    }
    await prisma.post.delete({
      where: { id: existPost.id },
    });
    res.status(200).json({ message: "This post was deleted" });
  } catch (err) {
    next(err);
  }
};
