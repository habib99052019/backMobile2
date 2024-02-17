const express = require('express')
const router = express.Router();
const lodash=require('lodash')
const landingSchema = require('../models/landing.js')

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

async function func(){
    var land1 = await landingSchema.create({
      name:"String",
  title1:"String",
  numberTitle1:"String",
  title2:"String",
  numbertitle2:"String",
  endTitle2:"String",
  title1Section2:"String",
  img1:"String",
  video1:"String",
  image2:"String",
  option1:[],
   objPosition:{
      pos1:"String",
      value1:"String",
      pos2:"String",
      value2:"String",
       pos3:"String",
      value3:"String"
   
  
    
  }
      


    })
   

}
 func()
console.log("declarer super cat")
router.post('/', async (req, res) => {
  
   var cat= await landingSchema.create( req.body)
   res.send(cat)
    
});
router.get('/', async (req, res) => {
  
    var cat= await landingSchema.find()
    res.send(cat)
     
 });
router.get('/:id', async (req, res) => {
  
    var cat= await landingSchema.findById(req.params.id)
    res.send(cat)
     
 });
router.put('/:id', async (req, res) => {
    try{
        var  cat = await landingSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
 
        res.send({message:true})
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});
router.delete('/:id', async (req, res) => {
    try{
        const catDelete = await landingSchema.deleteOne({ _id: req.params.id }).then(async (group) => {
            var cats = await   landingSchema.find();
            res.send(cats)
          })
        
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});


module.exports = router;
