const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notiSchema = new mongoose.Schema({

  details:{},
  date: String,
  product: { type: Schema.Types.ObjectId, ref:'prodSchema'}

})
module.exports = mongoose.model('notiSchema', notiSchema)
