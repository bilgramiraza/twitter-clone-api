const User = require('../models/user');

const login = async (req, res) => {
  if(req.errorObject) 
    return res.status(400).send({message:req.errorObject});

  const { username, password } = req.body;
  try{
    const foundUser = await User.findOne({username}).exec();
    if(!foundUser)
      return res.status(404).send({message:"Username not found"});

    const comparePasswords = await foundUser.comparePassword(password);
    if(!comparePasswords)
      return res.status(401).send({message:"Invalid Password"});

    const token = await User.genAuthToken();
    return res.status(200).json({message:"User Logged In",token});

  }catch(err){
    return res.status(500).send(err);
  }
};

const register = async (req, res) => {
  if(req.errorObject)
    return res.status(400).send({message:req.errorObject});

  try{
    const user = new User(req.body);
    await user.save();
    return res.status(201).send({message:'Registration Successful'});
  }catch(err){
    return res.status(500).send(err);
  }
};

const currentUser = async (req, res) => {
  try{
    const foundUser = await User.findById(req.user).select('username email friends friendReqs').lean().exec();
    const user = {
      username:foundUser.username,
      email:foundUser.email,
      friendCount:foundUser.friends.length,
      friendReqsCount:foundUser.friendReqs.length,
    };
    return res.status(200).send({user});
  }catch(err){
    return res.status(500).send(err);
  }
};

const modifyUser = (req, res, next) => {
  res.send('NOT IMPLEMENTED:');
};

const deleteUser = (req, res, next) => {
  res.send(`NOT IMPLEMENTED:`);
};

const getUser = (req, res, next) => {
  res.send('NOT IMPLEMENTED: ');
};

const getFriends = (req, res, next) => {
  res.send('NOT IMPLEMENTED: ');
};

const removeFriend = (req, res, next) => {
  res.send('NOT IMPLEMENTED: ');
};

const getFriendRequests = (req, res, next) => {
  res.send('NOT IMPLEMENTED: ');
};

const sendFriendRequest = (req, res, next) => {
  res.send('NOT IMPLEMENTED: ');
};

const acceptFriendRequest = (req, res, next) => {
  res.send('NOT IMPLEMENTED: ');
};

const declineFriendRequest = (req, res, next) => {
  res.send('NOT IMPLEMENTED: ');
};

module.exports = {
  login,
  register,
  logout,
  currentUser,
  modifyUser,
  deleteUser,
  getUser,
  getFriends,
  removeFriend,
  getFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
};

