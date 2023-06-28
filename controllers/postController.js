const Post = require('../models/post');
const User = require('../models/user');

const allPosts = async (req, res) => {
  try{
    const posts = await Post
      .find({parentPost:null})
      .sort({createdAt:'descending'})
      .exec();
    if(!posts.length)  return res.status(404).send({message:'No Posts Found'});

    return res.status(200).json({posts});
  }catch(err){
    return res.status(500).send(err);
  }
};

const friendsPosts = async (req, res) => {
  try{
    const userFriends = await User
      .findById(req.user.id)
      .select('friends')
      .exec();
    if(!userFriends)  return res.status(404).json({message:'User has no friends'});
    const friendPosts = await Post
      .find().where('author').in(userFriends)
      .select('parentPost post author likes comments')
      .populate('author','_id username')
      .sort({createdAt:'descending'})
      .exec();
    if(!friendPosts.length)  return res.status(404).json({message:"User's Friends have no posts"});

    return res.status(200).json({friendPosts});
  }catch(err){
    return res.status(500).send(err);
  }
};

const singlePost = (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Single post ${req.params.postId}`);
};

const createPost = (req, res, next) => {
  res.send('NOT IMPLEMENTED: post Create GET');
};

const createCommentPost = (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Comment for Post ${req.params.postId}`);
};

const modifyPost = (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Modifing Post ${req.params.postId}`);
};

const deletePost = (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Deleting Post ${req.params.postId}`);
};

module.exports = {
  allPosts,
  friendsPosts,
  singlePost,
  createPost,
  createCommentPost,
  modifyPost,
  deletePost,
};
