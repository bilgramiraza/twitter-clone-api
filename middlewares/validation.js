const passport = require('passport');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

function validationObject(req, res, next){
  //Create an ErrorHandling Object in the format of 
  //{[param]:[msg]}
  //Where 'params' is the input name which failed 
  //validation and msg is the Error Message generated for it

  const errorObject = validationResult(req).formatWith(({msg})=>msg).mapped();
  if(Object.keys(errorObject).length>0) req.errorObject = errorObject;
  return next();
}

const uniqueEmailCheck = async (value)=>{
  const foundEmail = await User.exists({email:value}).exec();
  if(foundEmail)  throw new Error('Email already in use by another account');
  return true;
};

const uniqueUsernameCheck = async (value)=>{
  const foundEmail = await User.exists({username:value}).exec();
  if(foundEmail)  throw new Error('Username already taken. Please choose a different one');
  return true;
};

const authMiddleware = [
  passport.authenticate('jwt', { session:false })
];

const loginValidation = [
  body('username', 'Username Cannot be Blank').trim().isLength({min:1}).escape(),
  body('password', 'Password Cannot be Blank').trim().isLength({min:8}).escape(),
  validationObject,
];

const registerValidation = [
  body('email', 'Email Cannot be Blank').trim().isEmail().withMessage('Invalid Email').escape().custom(uniqueEmailCheck),
  body('username', 'Username Cannot be Blank').trim().isLength({min:1}).escape().custom(uniqueUsernameCheck),
  body('password', 'Password Cannot be Blank').trim().isLength({min:8}).escape(),
  validationObject,
];

module.exports = {
  loginValidation,
  registerValidation,
  authMiddleware,
};
