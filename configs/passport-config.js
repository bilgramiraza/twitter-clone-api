const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require('../models/user');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyCallback = async (username, password, done)=>{
  try{
    const foundUser = await User.findOne({username});
    if(!foundUser) return done(null, false, {field:'username' ,msg:'User not found'});

    //Compare Hashed Passwords 
    const passwordCompare = await foundUser.comparePassword(password);
    if(!passwordCompare)  return done(null, false, {field:'password', msg:'Invalid Password'});

    return done(null, foundUser);
  }catch(err){
    return done(err);
  }
};

const strategy = new JwtStrategy(opts,verifyCallback);

passport.use(strategy);
