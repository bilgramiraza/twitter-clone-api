const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  post: { type:String, required:true },
  author: { type:Schema.Types.ObjectId, ref:'user', required:true },
  likes: { type: Number, required: true },
  timestamps: true,
});

module.exports = mongoose.model('post', postSchema);
