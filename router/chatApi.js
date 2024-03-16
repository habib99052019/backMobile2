const express = require('express')
const router = express.Router();
const lodash=require('lodash')
const chatSchema = require('../models/chat.js')

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

// async function func(){
//     var chat = await create({
//       name:"automobiles",
//       types:["voitures","car"],
//       carc:[{type:"pegeot", refs:['206',"205","106"]}],
//       options:["aaa","bbbb","ccccc"],


//     })
//     var chat = await create( {
//         name:"immobliers",
//         types:["vila","aprtement","dublex"],
//         carc:[],
//         options:["bathrcatchm","bedRcatchm","kkkkk"],
  
  
//       })

// }
// func()
console.log("declarer super chat")
router.post('/', async (req, res) => {
  console.log(req.body)
   var chats= await chatSchema.create(req.body)
     await res.status(200).json(req.body);

    
});
router.get('/', async (req, res) => {
  
    var chats= await chatSchema.find().populate('product')
    res.send(chats)
     
 });
// router.get('/lengthFacebook', async (req, res) => {
  
//     var chats= await chatSchema.find({ isFacebook:true,isNouveaux:true})
//     res.send({length:chats.length})
     
//  });
// router.get('/lengthWebSite', async (req, res) => {
  
//     var chats= await chatSchema.find({ isWebSite:true,isNouveaux:true})
//     res.send({length:chats.length})
     
//  });
// router.get('/facebook', async (req, res) => {
  
//   var chats= await chatSchema.find({ isFacebook:true,isNouveaux:true})
//     res.send(chats)
     
//  });
// router.get('/webSite', async (req, res) => {
  
//  var chats= await chatSchema.find({ isWebSite:true,isNouveaux:true})
//     res.send(chats)
     
//  });
router.get('/:id', async (req, res) => {
  
    var chat= await chatSchema.findById(req.params.id)
    res.send(chat)
     
 });
router.put('/:id', async (req, res) => {
    try{
        var  chat = await chatSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
 
        res.send({message:true})
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});
router.delete('/:id', async (req, res) => {
    try{
        const chatDelete = await chatSchema.deleteOne({ _id: req.params.id }).then(async (group) => {
            var chats = await   chatSchema.find();
            res.send(chats)
          })
        
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});
router.delete('/', async (req, res) => {
    try{
        const chatDelete = await chatSchema.deleteMany()
          
            res.send({message:true})
       
        
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});

module.exports = router;
