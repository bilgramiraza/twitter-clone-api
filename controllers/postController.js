const post = require('../models/post');

//Only have to implement this function once per project
const allPosts = (req, res, next) => {
  res.send('NOT IMPLEMENTED: All Posts');
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
