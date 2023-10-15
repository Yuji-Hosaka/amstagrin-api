const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const { upload } = require("../utils/cloudinary-server");
const fs = require("fs/promises");

exports.updateProfile = async (req, res, next) => {
  try {
    if (!req.files) {
      return next(createError("Profile image is required"));
    }
    if (req.files.profileImage) {
      const url = await upload(req.files.profileImage[0].path);
      await prisma.user.update({
        data: { profileImage: url },
        where: { id: req.user.id },
      });
    }

    res.status(200).json({ message: "UPLOAD SUCCESSFUL" });
  } catch (err) {
    next(err);
  } finally {
    if (req.files.profileImage) {
      fs.unlink(req.files.profileImage[0].path);
    }
  }
};
