const user = require('../models/user');

const login = (req, res, next) => {
  res.send('NOT IMPLEMENTED: ');
};
const register = (req, res, next) => {
  res.send('NOT IMPLEMENTED: ');
};
const logout = (req, res, next) => {
  res.send('NOT IMPLEMENTED:');
};
const currentUser = (req, res, next) => {
  res.send('NOT IMPLEMENTED:');
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

