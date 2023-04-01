const User = require('../models/user.model');
const HttpError = require('../support/http-error');
const jwt =require("jsonwebtoken");
  exports.login = async (req,res,next) => {
    const {email,password} = req.body
    const userExist = await User.findOne({email:email});
    if(!userExist) {
      const error = new HttpError("email or passwrod wrong?",401);
      return next(error)
    }
    const isMatch = await userExist.matchPassword(password);
    console.log(isMatch);
    if(!isMatch) {
      const error = new HttpError("email or passwrod wrong?",405);
      return next(error)
    }

    const token = jwt.sign({userExist},process.env.SECRET)
    res.send({status: "succes",
    user: userExist,
    token:token
    });
    
}


exports.register = async (req,res,next) => {
  const {email,password,first_name,last_name, role,profile_picture} = req.body
  const newUserEmailExist =await User.findOne({email});
  if (newUserEmailExist) {
    const error = new HttpError("email exist",405);
    return next(error)
  } 
  console.log(newUserEmailExist);
  const newUser = new User()
  newUser.email = email;
  newUser.password = password;
  newUser.first_name = first_name;
  newUser.last_name = last_name;
  if(role) newUser.role = role;
  if(profile_picture) newUser.profile_picture = profile_picture;
  await newUser.save();

  res.send({user : newUser})

}
