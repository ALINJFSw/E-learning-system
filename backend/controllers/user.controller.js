const CLass = require("../models/class.model");
const User = require("../models/user.model");
const HttpError = require("../support/http-error");

exports.testUser = (req, res, next) => {
  res.send(req.user);
};

exports.addClass = async (req, res, next) => {
  const { classId } = req.body;
  const userData = req.user;
  try {
    const user = await User.findById(userData._id);
    const isAddedBefore = user.classes.filter((id) => id == classId);
    console.log(isAddedBefore);
    if (isAddedBefore.length != 0) {
      const err = new HttpError("this class is in your library ", 404);
      return next(err);
    }
    user.classes.push(classId);

    user.save();
    res.send({
      status: "succes",
      user: User,
    });
  } catch (error) {
    const err = new HttpError("server error", 400);
    return next(err);
  }
};

exports.getClasses = async (req, res, next) => {
  try {
    const userInfo = req.user;
    const user = await User.findById(userInfo._id).populate("classes").populate("classes.admin");
    res.send({ status: "succes", classes: user.classes });
  } catch (error) {
    const err = new HttpError(error.message, 404);
    return next(err);
  }
};
exports.getAllClasses = async (req, res, next) => {
  try {
    const classes = await CLass.find().populate("admin");
    res.send({ status: "succes", classes: classes });
  } catch (error) {
    const err = new HttpError(error.message, 404);
    return next(err);
  }
};
exports.askToWithdrawClass = async (req, res, next) => {
  try {
    const { classId } = req.body;
    const userInfo = req.user;
    const user = await User.findById(userInfo._id)
    const classToWithdrawClassExist = user.askToWithdrawClass.filter(
      (classID) => classID.class == classId
    );
    if (classToWithdrawClassExist.length != 0) {
      const err = new HttpError(
        "you asked to withdraw this class befor, wainting for aprove or decline",
        405
      );
      return next(err);
    }
    user.askToWithdrawClass.push({
        user: userInfo._id,
        class: classId
    })
    user.save()
    res.send({ status: "succes", classes: user });
  } catch (error) {
    const err = new HttpError(error.message, 404);
    return next(err);
  }
};
