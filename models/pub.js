const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  pubSchema  = new mongoose.Schema({
   
    // title:String,
    // description:String,
    // images:[],
    // lien:String,
    // catigories:String
     dynamicData: mongoose.Schema.Types.Mixed
  });
module.exports=mongoose.model('pubSchema',pubSchema);
