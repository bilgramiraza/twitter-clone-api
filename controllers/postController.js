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

const currentUserPosts = async (req, res) => {
  try{
    const userPosts = await Post
      .find({author:req.user.id})
      .populate('author','username')
      .sort({createdAt:'descending'})
      .exec();
    if(!userPosts.length)  return res.status(404).json({message:"User has no posts"});

    return res.status(200).json({userPosts});
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

const singlePost = async (req, res) => {
  try{
    const post = await Post
      .findById(req.params.postId)
      .populate('likes','username')
      .populate('comments')
      .exec();
    if(!post)  return res.status(404).json({message:"Post not Found"});

    return res.status(200).json({post});
  }catch(err){
    return res.status(500).send(err);
  }
};

const createPost = async (req, res) => {
  if(req.errorObject) 
    return res.status(400).send({message:req.errorObject});

  try{
    const post = new Post({
      post:req.body.post,
      author:req.user.id,
    });
    await post.save();

    return res.status(200).send({message:'Post Created Successfully'});
  }catch(err){
    return res.status(500).send(err);
  }
};

const createCommentPost = async (req, res) => {
  if(req.errorObject) 
    return res.status(400).send({message:req.errorObject});

  try{
    const post = new Post({
      parentPost:req.params.postId,
      post:req.body.post,
      author:req.user.id,
    });
    await post.save();

    return res.status(200).send({message:'Comment Created Successfully'});
  }catch(err){
    return res.status(500).send(err);
  }
};

const modifyPost = async (req, res) => {
  if(req.errorObject) 
    return res.status(400).send({message:req.errorObject});

  try{
    const post = new Post({
      post:req.body.post,
    });
    await Post.findByIdAndUpdate(req.params.postId, post, { new:true });

    return res.status(201).send({message:'Post Modified Successfully'});
  }catch(err){
    return res.status(500).send(err);
  }
};

const deletePost = async (req, res) => {
  if(req.errorObject) 
    return res.status(400).send({message:req.errorObject});

  try{
    await Post.findByIdAndDelete(req.params.id);
    
    return res.status(201).send({message:'Post Deleted Successfully'});
  }catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  allPosts,
  currentUserPosts,
  friendsPosts,
  singlePost,
  createPost,
  createCommentPost,
  modifyPost,
  deletePost,
};
