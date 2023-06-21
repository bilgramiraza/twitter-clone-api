const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require('../models/user');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  issuer:'twitter-clone',
};

const verifyCallback = async (jwtPayload, done)=>{
  try{
    const foundUser = await User.findById(jwtPayload.sub);
    if(!foundUser) return done(null, false);

    return done(null, foundUser);
  }catch(err){
    return done(err);
  }
};

const strategy = new JwtStrategy(opts,verifyCallback);

passport.use(strategy);
