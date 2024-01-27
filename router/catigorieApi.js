const express = require('express')
const router = express.Router();
const lodash=require('lodash')
const catSchema = require('../models/catigories.js')

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

/*async function func(){
    var cat1 = await catSchema.create({
      name:"Peugeot",
      refs:["206","106","205","301"],
      


    })
    var cat2 = await catSchema.create( {
        name:"Fiat",
       refs:["Doblo","500X","Ducato"],
  
  
      })

}*/
// func()
console.log("declarer super cat")
router.post('/', async (req, res) => {
  
   var cat= await catSchema.create( req.body)
   res.send(cat)
    
});
router.get('/', async (req, res) => {
  
    var cat= await catSchema.find()
    res.send(cat)
     
 });
router.get('/:id', async (req, res) => {
  
    var cat= await catSchema.findById(req.params.id)
    res.send(cat)
     
 });
router.put('/:id', async (req, res) => {
    try{
        var  cat = await catSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
 
        res.send({message:true})
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});
router.delete('/:id', async (req, res) => {
    try{
        const catDelete = await catSchema.deleteOne({ _id: req.params.id }).then(async (group) => {
            var cats = await   catSchema.find();
            res.send(cats)
          })
        
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});


module.exports = router;
