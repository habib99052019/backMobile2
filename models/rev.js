const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  revSchema  = new mongoose.Schema({
   
  description:String,
status:String,
sender:[]
  });
module.exports=mongoose.model('revSchema',revSchema);
