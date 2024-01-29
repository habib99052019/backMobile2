const express = require('express')
const router = express.Router();

const lodash=require('lodash')
const prodSchema = require('../models/products.js')
const userSchema = require('../models/user.js')
const pubSchema = require('../models/pub.js')

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const tab=[]
// async function func(){

// var a="65a4f993275b403a456edbe7"
//     var prod= await prodSchema.create( {
//         "title": "title",
//         "userPosterId": "65a4f993275b403a456edbe7",
//         "description": "description",
//         "isPub": false,
//         "images": [
//             "https://c4.wallpaperflare.com/wallpaper/846/173/87/5c1cbaf96bcec-wallpaper-preview.jpg",
//             "https://c4.wallpaperflare.com/wallpaper/846/173/87/5c1cbaf96bcec-wallpaper-preview.jpg",
//             "https://c4.wallpaperflare.com/wallpaper/846/173/87/5c1cbaf96bcec-wallpaper-preview.jpg",
//             "https://c4.wallpaperflare.com/wallpaper/846/173/87/5c1cbaf96bcec-wallpaper-preview.jpg",
//         ],
//         "caractes": [
//     {
//             "details": [
//             {
//                     "title": "area",
//                     "value": "area"
//             },
//             {
//                     "title": "rooms",
//                     "value": "rooms"
//             },
//             {
//                     "title": "bathrooms",
//                     "value": "bathrooms"
//             },
//             {
//                     "title": "floor",
//                     "value": "floor"
//             },
//             {
//                     "title": "interior",
//                     "value": "interior"
//             },
//             {
//                     "title": "price",
//                     "value": "price"
//             }
//         ],
//         "options": []
//     }
//         ],
//         "chat": [],
//         "reviews": [],
//         "ville": "beja",
//         "city": "",
//         "catigories": "house"
//     })
//    await userSchema.findByIdAndUpdate({ _id:a}, { $push: { products: prod._id } })


// }
// func()
console.log("declarer super prod")
router.get('/', async (req, res) => {
  
    var prods= await prodSchema.find()
    res.send(prods)
     
 });
router.get('/aaa', async (req, res) => {
    var pubs= await pubSchema.find()
    res.send(pubs)
     
 });
router.post('/zap', async (req, res) => {
    const dynamicData = req.body
     // var prod= await pubSchema.create({dynamicData})
  var prod= await pubSchema.create(req.body)
   
  // Handle the data and store it in MongoDB if needed
  // ...
 // await  tab.push(dataFromFacebook)
 // res.status(200).json({ message: 'Data received successfully' });
   await res.status(200).json(req.body);


     
 });
router.post('/zapp', async (req, res) => {
  


 res.status(200).json(req.body);


     
 });
 router.get('/:id', async (req, res) => {
    var  prod = await prodSchema.findById(req.params.id)
    
    res.send(prod)
     
 });
router.post('/add',  async (req, res) => {
   
             
// console.log(req.body , typeOf(req.body))
    

   var prod= await prodSchema.create(req.body)
   
 
   await userSchema.findByIdAndUpdate({ _id:req.body.userPosterId}, { $push: { products: prod._id } })
   res.send(prod)
    
});
router.put('/:id', async (req, res) => {
    try{
        var  prod = await prodSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
 
        res.send({message:true})
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});
router.delete('/:id', async (req, res) => {
    try{
        var prod= await prodSchema.findById(req.params.id)
        await userSchema.findByIdAndUpdate({ _id:prod.userPosterId}, { $pull: { products: prod._id } })

        const prodDelete = await prodSchema.deleteOne({ _id: req.params.id }).then(async (group) => {
            var prods = await   prodSchema.find();
            res.send(prods)
          })
        
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});


module.exports = router;
