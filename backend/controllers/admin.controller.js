const CLass = require("../models/class.model");
const User = require("../models/user.model");
const HttpError = require("../support/http-error");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send({
      status: "succes",
      users: users,
    });
  } catch (error) {
    const err = new HttpError(error.message, 400);
    return next(err);
  }
};

exports.addClass = async (req, res, next) => {
  try {
    const { name } = req.body;
    const adminName = req.user._id;
    const classExist = CLass.findOne({ name: name });
    console.log(classExist);
    if (classExist) {
      const err = new HttpError("this class exist", 405);
      return next(err);
    }
    const newClass = new CLass();
    newClass.name = name;
    newClass.admin = adminName;
    newClass.save();
    res.send({
      status: "succes",
      class: newClass,
    });
  } catch (error) {
    const err = new HttpError(error.message, 400);
    return next(err);
  }
};
