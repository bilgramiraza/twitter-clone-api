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

    const token = User.genAuthToken();
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
    const foundUser = await User.findById(req.user.id).select('username email friends friendReqs').lean().exec();
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

const modifyUser = async (req, res) => {
  if(req.errorObject)
    return res.status(400).send({message:req.errorObject});

  try{
    const user = new User(req.body);
    await User.findByIdAndUpdate(req.user.id,user,{ new:true });
    return res.status(201).json({message:'User Info Modification Successful'});
  }catch(err){
    return res.status(500).send(err);
  }
};

const deleteUser = async (req, res) => {
  try{
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    if(!deletedUser)  res.status(404).send({message:'User Not Found'});  

    return res.status(204).json({message:'User Deleted Successfully'});
  }catch(err){
    return res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  try{
    const foundUser = await User.findOne({ username:req.params.username }).select('_id username').lean().exec();
    if(!foundUser)  res.status(404).send({message:'User Not Found'});

    return res.status(200).json({username:foundUser.username, id:foundUser._id});
  }catch(err){
    return res.status(500).send(err);
  }
};

const getFriends = async (req, res) => {
  try{
    const friendsList = await User
      .findById(req.user.id)
      .select('friends')
      .populate('friends','_id username')
      .lean()
      .exec();
    if(!friendsList)  res.status(404).send({message:'User has no friends'});

    return res.status(200).json({friendsList});
  }catch(err){
    return res.status(500).send(err);
  }
};

const removeFriend = async (req, res) => {
  try{
    const currentUser = await User.findById(req.user.id).exec();
    if(!currentUser)  return res.status(404).send({message:'Friend not found'});

    await currentUser.removeFriend(req.params.userId);
    return res.status(204).json({message:'Friend Removed'});
  }catch(err){
    return res.status(500).send(err);
  }
};

const getFriendRequests = async (req, res) => {
  try{
    const friendReqs= await User
      .findById(req.user.id)
      .select('friendReqs')
      .populate('friendReqs','_id username')
      .lean()
      .exec();
    if(!friendReqs)  res.status(404).send({message:'User has no Friend Requests'});

    return res.status(200).json({friendReqs});
  }catch(err){
    return res.status(500).send(err);
  }
};

const sendFriendRequest = async (req, res) => {
  try{
    const friend= await User.findById(req.params.userId).exec();
    if(!friend)  return res.status(404).send({message:'User Not Found'});

    await friend.sendFriendRequest(req.user.id);

    return res.status(200).json({message:'Friend Request Sent'});
  }catch(err){
    return res.status(500).send(err);
  }
};

const acceptFriendRequest = async (req, res) => {
  try{
    const user = await User.findById(req.user.id).exec();
    if(!user) return res.status(404).send({message:'User Not Found'});

    await user.acceptFriendRequest(req.params.userId);

    return res.status(200).json({message:'Friend Request Accepted'});
  }catch(err){
    return res.status(500).send(err);
  }
};

const declineFriendRequest = async (req, res) => {
  try{
    const user = await User.findById(req.user.id).exec();
    if(!user) return res.status(404).send({message:'User Not Found'});

    await user.declineFriendRequest(req.params.userId);

    return res.status(200).json({message:'Friend Request Declined'});
  }catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  login,
  register,
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

