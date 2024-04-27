const express = require('express')
const router = express.Router();
const lodash=require('lodash')
const pubSchema = require('../models/pub.js')
const nodemailer = require('nodemailer');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
var cron = require('node-cron');
const axios = require('axios');
// const express = require('express');
// const axios = require('axios');
const cheerio = require('cheerio');

// const app = express();

// Endpoint pour le scraping
router.get('/scrape', async (req, res) => {
    try {
        // URL de la page à scraper
        const url = 'https://www.bayut.com/for-sale/apartments/dubai/';

        // Récupérer le contenu HTML de la page
        const { data } = await axios.get(url);

        // Charger le contenu HTML dans Cheerio
        const $ = cheerio.load(data);

        // Sélectionner tous les éléments <li> qui contiennent les produits
        const productLis = $('.c4fc20ba');

        // Tableau pour stocker le HTML des éléments <li> des produits
        const productHtmls = [];

        // Parcourir chaque élément <li> et stocker son HTML
        productLis.each((index, element) => {
            productHtmls.push($.html(element));
        });

        // Envoyer les données extraites en tant que réponse JSON
        res.json({ productHtmls });
    } catch (error) {
        console.error('Erreur lors du scraping :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors du scraping' });
    }
});

// Port pour le serveur Express


// const twilio = require('twilio');
// // const accountSid = 'ACc75095edba8992b4e0c2f698a0656cdf';
// // const authToken = '0b843539117bb3fe1cef25304385feab'
// const accountSid = 'ACc75095edba8992b4e0c2f698a0656cdf'    ///'ACc75095edba8992b4e0c2f698a0656cdf';
// const authToken = '1b0ea11e09744ae508c91c7deca52774';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//     .create({
//         body: 'hy habib',
//         from: 'whatsapp:+14155238886',//+14155238886
//         to: 'whatsapp:+21652028532'
//     })
//     .then(message => console.log(message.sid))
//     .done();
// const client = new twilio(accountSid, authToken)
// async function sendWhatsAppMessage(to, message) {
//   try {
//     const response = await client.messages.create({
//       body: message,
//       from: 'whatsapp::+14155238886', // Your Twilio Sandbox Number
//       to: `whatsapp:${to}`,
//     });
//     console.log(`Message sent to ${to}: ${response.sid}`);
//   } catch (error) {
//     console.error(`Failed to send message: ${error}`);
//   }
// }

// sendWhatsAppMessage('+21652028532', 'Hello from Twilio WhatsApp API!');
// async function rr12(){
//     var pubs= await pubSchema.find()
//   for (let i = 0; i < pubs.length; i++) {
//    var pub= await pubSchema.findOne({email:pubs[i].email})
//   if(pub){
//       console.log(i,"vv")
//     await pubSchema.deleteOne({ _id: pub._id })
//   }
//   }
// }
// rr12()


var tabEm=[]
var tabNoveaux=[]
router.post('/send-mail1/:id',async (req, res) => {
    console.log(req.body.email)
  

   text="*"+ req.body.name+"*" +req.body.email + '*'+ req.body.phone+"*"+ req.body.project +"*"+req.body.typRef+"*"+req.body.typM+"*"+req.body.typB+"*"+req.body.date+"*"
  console.log(req.params.id ,'rr')

    const mailOptions = {
        from:"heartofcarthagedubai@gmail.com",
         to: req.params.id,  //"Contact@heartofcarthage.com" ,
        subject: 'New customer',
       html: `<div><h2>Information to customer</h2></div>
       <pre>name: ${req.body.name}</pre>
       <pre>phone: ${req.body.phone}</pre>
       <pre>email: ${req.body.email}</pre>
       <h5>${req.body.project}</h5>
       <pre>What is the subject of the consultation?: ${req.body.q1}</pre>
       <pre>What type of property do you wan: ${req.body.q2}</pre>
       <pre>type of consultation: ${req.body.q3}</pre>
       <pre>date of meeting: ${req.body.dateMeet}</pre>
       <pre>time of meeting: ${req.body.timeMeet}</pre>
       <h2 style='margin-left:60%'>Good luck</h2>
       `
        
    };
   //oflniaebswpiddrt
    // email transport configuration

   
//         maxConnections: 3, //<-----------ADD THIS LINE
//         pool: true,
       
//         host: "smtp-mail.outlook.com", // hostname
//         secureConnection: false, // TLS requires secureConnection to be false
//         port: 587, // port for secure SMTP
        
//   secure: false,
//   ignoreTLS:  false,
//   requireTLS: false,
//   connectionTimeout:  5000,
//   greetingTimeout: 5000,
//   socketTimeout: 5000, // port for secure SMTP
//         tls: {
//             rejectUnauthorized: false
//         }
//         ,
var transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
             user: "heartofcarthagedubai@gmail.com" ,      // "hearth.Of.carthage90@outlook.fr",
            pass:"lflcuyknikjuqyrb"  //"5h5a171078" //"5qtztsuwozbbnrmcm"
        }  
    });
    // send email
    try{
        await transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.reponse);
                res.json({message: "email send sucessfully"});
            }
        });
    }catch(err){
        console.log(err);
        
      }
  
});
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
  pubs.employer=""
    await  pubs.save()
     await res.status(200).json({message:true});

    
});
router.post('/sable', async (req, res) => {


     await res.status(200).json({message:true});

    
});
router.get('/sable', async (req, res) => {


     await res.status(200).json({message:true});

    
});
router.get('/pro', async (req, res) => {
    res.send(tabNoveaux)
})
router.get('/', async (req, res) => {
  
    var pubs= await pubSchema.find()
//     var tabj=[]
//     tabj.push(pubs[0])
    
//     for (let i = 0; i < pubs.length; i++) {
//     let user = pubs[i];
//     // Si l'email de l'utilisateur n'existe pas encore dans la Map, l'ajouter
//     if (tab.some(ele=>ele.email === user.email).length== true ) {
//         tab.push(user)
//     }
// }
     
//     res.send(tabj)
    res.send(pubs)     
 });
router.get('/nonNouveaux', async (req, res) => {
  
    var pubs= await pubSchema.find({isNouveaux:false})
    res.send(pubs)
     
 });
router.post('/sales', async (req, res) => {
  
    var pubs= await pubSchema.find({isNouveaux:false ,employer:req.body.employer})
    res.send(pubs)
     
 });
router.post('/salesNew', async (req, res) => {
  
    var pubs= await pubSchema.find({isNouveaux:true ,employer:req.body.employer})
    res.send(pubs)
     
 });
router.post('/NumberLeadsForSales', async (req, res) => {
  
    var pubs= await pubSchema.find({isNouveaux:false ,employer:req.body.employer})
     res.send({length:pubs.length})
     
 });
router.get('/all', async (req, res) => {
  
    var pubs= await pubSchema.find()
    res.send(pubs)
     
 });
router.get('/allE', async (req, res) => {
  
    
    res.send({tab1:tabEmp[Math.floor(Math.random() * tabEmp.length)]
               })
     
 });

router.get('/lengthFacebook', async (req, res) => {
  
    var pubs= await pubSchema.find({ isFacebook:true,isNouveaux:true})
    res.send({length:pubs.length})
     
 });
router.post('/log', async (req, res) => {
  
    
    var pub = await pubSchema.findOne({ login: req.body.login })
    res.send(pub)
     
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
router.put('/creation/:id', async (req, res) => {
    try{
        var  pub = await pubSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
 
        res.send(pub)
   
        
    
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
 async function func2(){
     var prod= await pubSchema.find()
     for (let i = 0; i < prod.length; i++) {
        prod[i].employer =""
         prod[i].isNouveaux=true   
         await prod[i].save()
     }
    
 }
func2()
cron.schedule('*/1 * * * *', async () => {
       var prod= await pubSchema.find({isNouveaux:true})
       const response = await axios.get('https://backendiheb2.onrender.com/backend/employer');
     tabEmp=response.data
    // Traiter les données de réponse ici
   
     for (let i = 0; i < prod.length; i++) {
        if(prod[i].employer  == ''){
         prod[i].employer=tabEmp[Math.floor(Math.random() * tabEmp.length)].login;
           await prod[i].save()
 
    }
    if(prod[i].employer !== '' ){
        var indexEmp=tabEmp.findIndex(ele=>ele.login==prod[i].employer)
         // console.log(indexEmp,"vv")
        if(indexEmp==tabEmp.length-1)
        {
                     prod[i].employer=tabEmp[0].login;

              await prod[i].save()
        }
        if(indexEmp < tabEmp.length-1)
        {
            prod[i].employer=tabEmp[indexEmp+1].login;

              await prod[i].save() 
        }
    }
}
    
})
module.exports = router;
