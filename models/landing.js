
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  landingSchema  = new mongoose.Schema({
   
   title1:String,
  title2:String,
  img1:String,
  video1:String,
  image2:String,
  option1:[]
  
    
  });
module.exports=mongoose.model(' landingSchema', landingSchema);
