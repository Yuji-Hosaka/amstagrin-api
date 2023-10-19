const createError = require("../utils/create-error");
const prisma = require("../models/prisma");
const {upload} = require('../utils/cloudinary-server')

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
  }
};
