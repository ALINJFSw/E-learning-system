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
    const isAddedBefore = user.classes.filter(id => id == classId)
    console.log(isAddedBefore);
    if(isAddedBefore.length != 0){
        const err = new HttpError("this class is in your library ",404)
        return next(err)
    }
    user.classes.push(classId);

    user.save();
    res.send(user);
 } catch (error) {
        const err = new HttpError("server error",400)
        return next(err)
 }
};

exports.getClasses = async (req, res, next) => {
    try {
        const userClasses = req.user.classes
        res.send(userClasses);
    } catch (error) {
        
    }
}
