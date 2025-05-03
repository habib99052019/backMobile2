const express = require('express')
const router = express.Router();
//mmmm
const lodash = require('lodash')
const prodSchema = require('../models/products.js')
const userSchema = require('../models/user.js')
const pubSchema = require('../models/pub.js')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tab = []
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
const user1 = { lat: 37.59549894134107, lon: -122.02108629047869 }; // Paris, France
const user2 = { lat: 37.7331802307401, lon: -122.02108629047869 }; // New York, USA

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Rayon de la Terre en kilomètres
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  // if(distance <16){
  //   return true
  //  }
  //else{
  //   return false
  // }
  return distance
}
function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRad = angle => (angle * Math.PI) / 180;
  const R = 6371; // Rayon de la Terre en km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance en km
}
haversineDistance(user1.lat, user1.lon, user2.lat, user2.lon)
// Route pour calculer la distance entre les deux utilisateurs
router.post('/dist/nearby-products', async (req, res) => {
  const  lat  =  req.body.lat
  const long =req.body.long
  // console.log(lat,"eee")

  try {
    // Supposons que tu récupères les produits comme ça :
    const products = await prodSchema.find({isPub:false}).populate('userPosterId'); // à adapter selon ton modèle

    const productsWithDistance = products.filter(product => product.city && product.city.includes(';')).map(product => {
      const [productLat, productLong] = product.city.split(';').map(Number);
      // console.log(productLong)
      const distance = calculateDistance(lat, long, productLat, productLong);
      // console.log(distance,"eer")
    
      return {
        ...product.toObject(), // ou juste product si ce n’est pas un mongoose doc
        distance
      };
    });

    const sortedProducts = productsWithDistance.sort((a, b) => a.distance - b.distance);
   const pubs = await prodSchema.find({isPub:true})
    const pubsJson = pubs.map(pub => pub.toJSON());
    const prodsFinal = sortedProducts.concat(pubsJson);
    res.json(prodsFinal);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits proches :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});
router.post('/distance', async (req, res) => {
  //const distance = haversineDistance(user1.lat, user1.lon, user2.lat, user2.lon);
  const tab = []

  var prods = await prodSchema.find()
  for (let i = 0; i < prods.length; i++) {
    var dis = haversineDistance(prods[i].caractes[0].position.latitude, prods[i].caractes[0].position.longitude, req.body.lat, req.body.lon)
    if (dis < 16) {
      tab.push(prods[i])
    }

  }
  res.send(tab)
});
router.get('/', async (req, res) => {

  var prods = await prodSchema.find().populate('userPosterId')
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
  var prod = await prodSchema.findById(req.params.id).populate('userPosterId')

  res.send(prod)

});
router.post('/add', async (req, res) => {


  // console.log(req.body , typeOf(req.body))


  var prod = await prodSchema.create(req.body)


  await userSchema.findByIdAndUpdate({ _id: req.body.userPosterId }, { $push: { products: prod._id } })
  res.send(prod)

});
router.put('/:id', async (req, res) => {
  try {
    var prod = await prodSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.send({ message: true })



  } catch (error) {
    res.send(error.message)
  }

});
router.delete('/:id', async (req, res) => {
  try {
    var prod = await prodSchema.findById(req.params.id)
    //await userSchema.findByIdAndUpdate({ _id: prod.userPosterId }, { $pull: { products: prod._id } })

    const prodDelete = await prodSchema.deleteOne({ _id: req.params.id }).then(async (group) => {
      var prods = await prodSchema.find();
      res.send(prods)
    })




  } catch (error) {
    res.send(error.message)
  }

});


module.exports = router;
