const Post = require('../models/post');

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

const friendsPosts = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Friends posts');
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
