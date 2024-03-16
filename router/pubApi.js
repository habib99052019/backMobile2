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
  console.log(req.body)
   var pubs= await pubSchema.create(req.body)
pubs.dateLead=Date().slice(0,21)
    await  pubs.save()
     await res.status(200).json({message:true});

    
});
router.get('/', async (req, res) => {
  
    var pubs= await pubSchema.find()
    res.send(pubs)
     
 });
router.get('/lengthFacebook', async (req, res) => {
  
    var pubs= await pubSchema.find({ isFacebook:true,isNouveaux:true})
    res.send({length:pubs.length})
     
 });
router.get('/lengthWebSite', async (req, res) => {
  
    var pubs= await pubSchema.find({ isWebSite:true,isNouveaux:true})
    res.send({length:pubs.length})
     
 });
router.get('/facebook', async (req, res) => {
  
  var pubs= await pubSchema.find({ isFacebook:true,isNouveaux:true})
    res.send(pubs)
     
 });
router.get('/webSite', async (req, res) => {
  
 var pubs= await pubSchema.find({ isWebSite:true,isNouveaux:true})
    res.send(pubs)
     
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
