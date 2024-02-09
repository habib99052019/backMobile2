const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  notiSchema  = new mongoose.Schema({
   
    details:[],
     date:String,
    userPosterId:{ type: Schema.Types.ObjectId, ref:'userSchema'} // id user li habit l post
    
  });
module.exports=mongoose.model('notiSchema',notiSchema);
