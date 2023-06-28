const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  parentPost: { type:Schema.Types.ObjectId, ref:'post', default:null },
  post: { type:String, required:true },
  author: { type:Schema.Types.ObjectId, ref:'user', required:true },
  likes: [{ type: Schema.Types.ObjectId, ref:'user' }],
  comments:[{ type:Schema.Types.ObjectId, ref:'post' }],
},{ timestamps: true });

module.exports = mongoose.model('post', postSchema);
