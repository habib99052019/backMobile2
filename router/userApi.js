const express = require('express')
const router = express.Router();
const lodash=require('lodash')
const userSchema = require('../models/user.js')

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
var tab=[]
var dataUser=[]
const axios = require('axios');

// Définir le token d'accès (obtenu en créant une application sur le portail des développeurs de Facebook)
const accessToken = 'EAAPZA4N2HUuoBO43vkrGqzs5zkGgUgZCDZCAJ0ZCQhlwBEUoLpOi3WNz9a13GKM7Je674xJrm56u0kexNjfpqls3SujkbJzs14TKyDR5ZA9LCOg1U2ZCmfXeqx9vJRFEiK2yN98XiMUsvIyk6shOfUCzN9upkdOMimzEkM4MNDoO5zEubTySOFG4fSl3PLMtO3NWlwqMSe3GK6Y1JASbXwWUqE4Yv7GXsQlewGjZCZBSdhUZD';

// Intérêt que vous ciblez
const interest = 'real estate';

// Endpoint de l'API Graph pour rechercher des pages liées à l'intérêt spécifié
//const pagesEndpoint = `https://graph.facebook.com/v12.0/search?type=page&q=${interest}&access_token=${accessToken}`;

// Effectuer une requête GET à l'API Graph pour récupérer les pages liées à l'intérêt

// Import the Twilio module
const twilio = require('twilio');

// Replace these variables with your own values from your Twilio account
// const accountSid = 'ACcf5c740f20c39ae33fddbd3915fec6c9';
// const authToken = '35477a0de7f2ebbd468396a39e151349';

// const twilioPhoneNumber = '+16206850366';
// const recipientPhoneNumber = '+21650560071'; // Replace with the recipient's phone number

// // Create a Twilio client
// const client = new twilio(accountSid, authToken);
// async function func(){
// // Send an SMS message
// client.messages
//   .create({
//     body: 'Hello from Node.js and Twilio!', // Message text
//     from:'whatsapp:+16206850366', // Your Twilio phone number
//     to: 'whatsapp:+21652307723', // Recipient's phone number
//   })
//   .then((message) => {
//     console.log('Message sent successfully:', message.sid);
//   })
//   .catch((error) => {
//     console.error('Error sending message:', error);
//   });
// }
//func()
// async function func(){
//     var user = await userSchema.find()
//     console.log(user)

// }
// func()
// console.log("declarer super user")
//hhhh
router.get('/', async (req, res) => {
  
    var users = await userSchema.find()
    
        res.send(users)
})

router.get('/:id', async (req, res) => {
    var user=  await userSchema.findById(req.params.id).populate('products')
    res.send(user)
})
router.get('/prod/:id', async (req, res) => {
    var user=  await userSchema.findById(req.params.id).populate('products');
    res.send(user.products)
})
router.get('/rev/:id', async (req, res) => {
    var user=  await userSchema.findById(req.params.id).populate('reviews');
    res.send(user.reviews)
})
router.get('/t', async (req, res) => {
  
    var users = await userSchema.find()
    
        res.send(users)
})
// router.get('/dataUser', async (req, res) => {
  
//     axios.get(pagesEndpoint)
//   .then(response => {
//     // Récupérer les IDs des pages
//     const pageIds = response.data.data.map(page => page.id);
//     // Pour chaque page, récupérer les utilisateurs qui ont aimé ou suivi cette page
//     pageIds.forEach(pageId => {
//       const usersEndpoint = `https://graph.facebook.com/v12.0/${pageId}/likes?access_token=${accessToken}`;
//       axios.get(usersEndpoint)
//         .then(usersResponse => {
//           // Traiter les données des utilisateurs (par exemple, stocker dans une base de données)
//           dataUser=usersResponse.data
//           console.log(usersResponse.data);
//         })
//         .catch(error => {
//           console.error('Erreur lors de la récupération des utilisateurs:', error);
//         });
//     });
//   })
//   .catch(error => {
//     console.error('Erreur lors de la récupération des pages:', error);
//   });

    
//         res.send(dataUser)
// })
router.post('/adduser', async (req, res) => {
    try{
        var user = await userSchema.findOne({email:req.body.email});


    if(!user)
       
   { 
    var user =  await  userSchema.create(req.body)
   // await userSchema.findByIdAndUpdate(user._id,{hist:[],resultatRoulette:0}, { new: true })
    const saltRounds = 10;
    const salt = bcrypt.genSalt(saltRounds)
   user.password = await bcrypt.hash(user.password, saltRounds);// pour crypter password

   await  user.save();
   
   return res.send({
       message: true,
       id: user._id
    })
    }
    else{
        return res.send({message:false})
    }
   
 /*var  user  =new userSchema({
           nom:req.params.nom,
         age:req.params.age     //tu peut creer d'apres les parametres /:nom/:age en api de poste
      
   })    
    /*  user = await userSchema.create(user);*/
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});
router.put('/:id', async (req, res) => {
    try{
        var  user = await userSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
 
        res.send({message:true})
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});
router.delete('/:id', async (req, res) => {
    try{
        const userDelete = await userSchema.deleteOne({ _id: req.params.id }).then(async (group) => {
            var users = await   userSchema.find();
            res.send(users)
          })
        
   
        
    
    }catch(error){
        res.send(error.message)   
    }
    
});
router.post('/login', async (req, res) => {
   
   
    try {
        var user = await userSchema.findOne({ email: req.body.email })

         
        if (user) {
            console.log(user,12);
           const  test = await bcrypt.compare(req.body.password, user.password)
                console.log(test ,5)
            if (test) {
                var token = jwt.sign({ _id: user._id }, 'privateKey', { expiresIn: '1d' })
               user.token=token
              await user.save()
                console.log(user);
                // res.send({token: token})  pour envoyer comme objet  json 
                res.header('Authorization', token).send({ 
                    message: true , 
                    user: user._id,
                    //role:user.role,
                      token: token })
            }
            else { //res.status(201).send("mots de passe incorrect")
                return res.send({ message: false })
            }

        }
        else {
            return /*res.status(401).send("email ou mots ded passe incorrect").*/res.send({ message: false })
        }

    } catch (error) {
        res.send(error.message)
    }

});

module.exports = router;
