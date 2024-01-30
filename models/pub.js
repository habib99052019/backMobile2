const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  pubSchema  = new mongoose.Schema({
   
    // title:String,
    // description:String,
    // images:[],
    // lien:String,
    // catigories:String jjjj
     //dynamicData: mongoose.Schema.Types.Mixed
   name:String,
   phone:String,
   statut:String,
   isNew:Boolean,
   email:String
  });
module.exports=mongoose.model('pubSchema',pubSchema);
