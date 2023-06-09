const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type:String, required:true },
  email: { type:String, required:true },
  password: { type:String, required:true },
  friends: [{ type:Schema.Types.ObjectId, ref:'user' }],
  friendReqs:[{ type:Schema.Types.ObjectId, ref:'user' }],
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
  return bcrypt.compare(inputPassword,this.password);
}

module.exports = mongoose.model('user', userSchema);
