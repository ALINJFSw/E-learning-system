const CLass = require("../models/class.model");
const User = require("../models/user.model");
const HttpError = require("../support/http-error");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("classes");
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
    const classExist = CLass.find({ name: name });
    console.log("test",classExist);
    // if (!!classExist) {
    //   const err = new HttpError("this class exist", 405);
    //   return next(err);
    // }
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

exports.getWithdrawalRequest = async (req,res,next) => {

    try {
        const users = await User.find().populate("askToWithdrawClass.class");
        const requests = users.map(user => {
            if(user.askToWithdrawClass) return user.askToWithdrawClass
        })
        res.send(requests)
    } catch (error) {
        const err = new HttpError(error.message, 400);
        return next(err);
    }

}

exports.accept = async(req,res,next) =>{

    try {
        const {userID,classId} = req.body;
        const user = await User.findById(userID);
        user.askToWithdrawClass = user.askToWithdrawClass.filter(id => id.class.toString() != classId );
        user.classes = user.classes.filter(id => id.toString() != classId );
        user.save()
        res.send(user)
        
    } catch (error) {
        const err = new HttpError(error.message, 400);
        return next(err);
    }
}

exports.decline = async(req,res,next) =>{
    try {
        const {userID,classId} = req.body;
        const user = await User.findById(userID);
        user.askToWithdrawClass = user.askToWithdrawClass.filter(id => id.class.toString() != classId );
        user.save()
        res.send(user)
        
    } catch (error) {
        const err = new HttpError(error.message, 400);
        return next(err);
    }
}