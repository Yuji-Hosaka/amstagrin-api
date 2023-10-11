exports.updateProfile = async (req, res, next) => {
  try {
    res.status(200).json({ message: "UPLOAD DONE" });
  } catch (err) {
    next(err);
  }
};
