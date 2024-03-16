const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  pubSchema  = new mongoose.Schema({
   
    // title:String,
    // description:String,
    // images:[],
    // lien:String,
    // catigories:String jjjj jjjjjj;;
     //dynamicData: mongoose.Schema.Types.Mixed
   dateLead:String,
   name:String,
   employer:String,
   isFacebook:Boolean,
   isWebSite:Boolean,
   phone:String,
   statut:String,
   isNouveaux:Boolean,
   email:String,
   project:String
  });
module.exports=mongoose.model('pubSchema',pubSchema);
