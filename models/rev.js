const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const revSchema = new mongoose.Schema({

  description: String,
  status: String,
  sender: { type: Schema.Types.ObjectId, ref: 'userSchema' },
  forUserId:String
});
module.exports = mongoose.model('revSchema', revSchema);
