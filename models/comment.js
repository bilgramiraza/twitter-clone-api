const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: { type:String, required:true },
  author: { type:Schema.Types.ObjectId, ref:'user', required:true },
  parentPost: { type:Schema.Types.ObjectId, ref:'post', required:true },
  likes: { type: Number, required: true },
  timestamps: true,
});

module.exports = mongoose.model('comment', commentSchema);
