
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  landingSchema  = new mongoose.Schema({
   
    name:String,
  title1:String,
  numberTitle1:String,
  title2:String,
  numbertitle2:String,
  endTitle2:String,
  title1Section2:String,
  img1:String,
  video1:String,
  image2:String,
  option1:[]
  
    
  });
module.exports=mongoose.model(' landingSchema', landingSchema);
