const { body, validationResult } = require('express-validator');

function validationObject(req, res, next){
  //Create an ErrorHandling Object in the format of 
  //{[param]:[msg]}
  //Where 'params' is the input name which failed 
  //validation and msg is the Error Message generated for it

  const errorObject = validationResult(req).formatWith(({msg})=>msg).mapped();
  if(Object.keys(errorObject).length>0) req.errorObject = errorObject;
  return next();
}
const loginValidation = [
  body('username', 'Username Cannot be Blank').trim().isLength({min:1}).escape(),
  body('password', 'Password Cannot be Blank').trim().isLength({min:8}).escape(),
  validationObject,
];

module.exports = {
  loginValidation,
};
