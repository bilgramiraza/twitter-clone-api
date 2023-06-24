const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type:String, required:true },
  email: { type:String, required:true },
  password: { type:String, required:true },
  friends:{ 
    type:[{ type:Schema.Types.ObjectId, ref:'user' }],
    default:[],
  },
  friendReqs:{
    type:[{ type:Schema.Types.ObjectId, ref:'user' }],
    default:[],
  },
  tokens:{
    type:[{type:String}],
    validate:{
      validator: function (tokens){
        return tokens.length<=10;
      },
      message:'Too Many Active Instances',
    },
    default:[],
  },
  timestamps: true,
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  
  try{
    const hashedPassword = await bcrypt.hash(this.password,10);
    this.password = hashedPassword;
    return next();
  }catch(err){
    return next(err);
  }
});

userSchema.pre('findOneAndUpdate', async function(next){
  const data = this.getUpdate();
  
  if(!data) return next();
  if(!data.password) return next();

  try{
    const hashedPassword = await bcrypt.hash(data.password,10);
    data.password = hashedPassword;
    return next();
  }catch(err){
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(inputPassword){
  return await bcrypt.compare(inputPassword,this.password);
}

userSchema.methods.genAuthToken = async function(){
  const opts = {
    expiresIn: "1d",
    issuer:'twitter-clone',
  };
  const token = jwt.sign({sub: this._id},process.env.JWT_SECRET,opts);
  this.tokens = this.tokens.concat({token});
  try{
    await this.save();
    return token;
  }catch(err){
    throw err;
  }
};

module.exports = mongoose.model('user', userSchema);
