const express = require('express')
const router = express.Router();
const lodash=require('lodash')
const pubSchema = require('../models/pub.js')
const nodemailer = require('nodemailer');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
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
router.get('/', async (req, res) => {
  
    var pubs= await pubSchema.find({isNouveaux:true})
    res.send(pubs)
     
 });
router.get('/nonNouveaux', async (req, res) => {
  
    var pubs= await pubSchema.find({isNouveaux:false})
    res.send(pubs)
     
 });
router.get('/all', async (req, res) => {
  
    var pubs= await pubSchema.find()
    res.send(pubs)
     
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
