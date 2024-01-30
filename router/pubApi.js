const express = require('express')
const router = express.Router();
const lodash=require('lodash')
const pubSchema = require('../models/pub.js')

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

// async function func(){
//     var pub = await create({
//       name:"automobiles",
//       types:["voitures","car"],
//       carc:[{type:"pegeot", refs:['206',"205","106"]}],
//       options:["aaa","bbbb","ccccc"],


//     })
//     var pub = await create( {
//         name:"immobliers",
//         types:["vila","aprtement","dublex"],
//         carc:[],
//         options:["bathrcatchm","bedRcatchm","kkkkk"],
  
  
//       })

// }
// func()
console.log("declarer super pub")
router.post('/', async (req, res) => {
  
   var pub= await pubSchema.create( req.body)
   res.send(pub)
    
});
router.get('/', async (req, res) => {
  
    var pub= await pubSchema.find()
    res.send(pub)
     
 });
router.get('/:id', async (req, res) => {
  
    var pub= await pubSchema.findById(req.params.id)
    res.send(pub)
     
 });
router.put('/:id', async (req, res) => {
    try{
        var  pub = await pubSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
 
        res.send({message:true})
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});
router.delete('/:id', async (req, res) => {
    try{
        const pubDelete = await pubSchema.deleteOne({ _id: req.params.id }).then(async (group) => {
            var pubs = await   pubSchema.find();
            res.send(pubs)
          })
        
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});
router.delete('/', async (req, res) => {
    try{
        const pubDelete = await pubSchema.deleteMany()
          
            res.send({message:true})
       
        
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});

module.exports = router;
