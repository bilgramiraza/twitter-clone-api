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

userSchema.methods.genAuthToken = function(){
  const opts = {
    expiresIn: "1d",
    issuer:'twitter-clone',
  };
  const token = jwt.sign({sub:{ id:this._id, username:this.username}},process.env.JWT_SECRET,opts);
  return token;
};

userSchema.methods.removeFriend = async function(userId){
  this.friends = this.friends.filter(friendId => friendId.toString() !== userId);
  await this.save();
};

userSchema.methods.sendFriendRequest = async function(userId){
  this.friendReqs = this.friendReqs.concat(userId);
  await this.save();
};

userSchema.methods.acceptFriendRequest= async function(userId){
  this.friendReqs = this.friendReqs.filter(friendId => friendId.toString() !== userId);
  this.friends = this.friends.concat(userId);
  await this.save();
};

userSchema.methods.declineFriendRequest= async function(userId){
  this.friendReqs = this.friendReqs.filter(friendId => friendId.toString() !== userId);
  await this.save();
};

module.exports = mongoose.model('user', userSchema);
