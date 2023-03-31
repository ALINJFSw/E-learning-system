const User = require('../models/user.model');

  exports.login = async (req,res) => {

    const user = await User.findOne({email:email});

    if(! !!user) res.send({status:"faild"})
    res.send({status: user});
    
}


exports.register = async (req,res) => {
  const {email,password,first_name,last_name, role,profile_picture} = req.body
  const newUserEmailExist = User.find({email});
  if (newUserEmailExist) {
    res.send({status :"user exist"})
  } 
  const newUser = new User()
  newUser.email = email;
  newUser.password = password;
  newUser.first_name = first_name;
  newUser.last_name = last_name;
  if(role) newUser.role = role;
  if(profile_picture) newUser.profile_picture = profile_picture;
  newUser.save();

  res.send({user : newUser})

}
