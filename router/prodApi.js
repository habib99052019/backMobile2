const express = require('express')
const router = express.Router();

const lodash=require('lodash')
const prodSchema = require('../models/products.js')
const userSchema = require('../models/user.js')
const pubSchema = require('../models/pub.js')

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const tab=[]
//CAS7Q8XUEPU7925E9HY2MWB3
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
const user1 = { lat: 48.8566, lon: 2.3522 }; // Paris, France
const user2 = { lat: 40.7128, lon: -74.0060 }; // New York, USA

function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
  // if(distance <16){
    //   return true
 //  }
    //else{
     //   return false
   // }
    return distance
}

// Route pour calculer la distance entre les deux utilisateurs
router.post('/distance', async (req, res) => {
    const distance = haversineDistance(user1.lat, user1.lon, user2.lat, user2.lon);
    var prods= await prodSchema.find()
    var tabProdDist= prods.filter(ele=>haversineDistance(ele.caractes[0].position.latitude,ele.caractes[0].position.longitude, req.body.lat, req.body.lon)==true)
     res.send(tabProdDist); // Envoyer la distance en réponse
});
router.get('/distance', async (req, res) => {
    //const distance = haversineDistance(user1.lat, user1.lon, user2.lat, user2.lon);
    var prods= await prodSchema.find()
      var tabProdDist=[]
  var   user={
        Lat : 37.7331802307401,
       Long : -122.02108629047869
    }
    for (let i = 0; i < prods.length; i++) {
        //if(haversineDistance(prods[i].caractes[0].position.latitude,prods[i].caractes[0].position.longitude, user.lat, user.long)==true){
      //   tabProdDist.push(haversineDistance(prods[i].caractes[0].position.latitude,prods[i].caractes[0].position.longitude, user.lat, user.long))
      //  }
        tabProdDist.push({lat:prods[i].caractes[0].position.latitude,
                         lon:prods[i].caractes[0].position.longitude})
    }
     // res.send({len:tabProdDist.length});
    res.send(tabProdDist)// Envoyer la distance en réponse
});
router.get('/', async (req, res) => {
  
    var prods= await prodSchema.find()
    res.send(prods)
     
 });
router.get('/aaa', async (req, res) => {
   
    res.send(tab)
     
 });
router.post('/zap', async (req, res) => {
    const dynamicData = req.body
     // var prod= await pubSchema.create({dynamicData})
  
 // var prod= await pubSchema.create(JSON.parse(req.body))
   
  // Handle the data and store it in MongoDB if needed
  // ...
 tab.push(req.body)
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
