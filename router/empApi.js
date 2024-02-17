
const express = require('express')
const router = express.Router();

const employerSchema = require('../models/emp.js')

router.post('/addemployer', async (req, res) => {
    try{
        var employer = await employerSchema.findOne({login:req.body.login});


    if(!employer)
       
   { 
    var employer =  await  employerSchema.create(req.body)
 //   const saltRounds = 10;
//    const salt = bcrypt.genSalt(saltRounds)
  // employer.password = await bcrypt.hash(employer.password, saltRounds);// pour crypter password

 //  await  employer.save();
   return res.send({
       message: true,
       id: employer._id
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

router.put('/modif/:id', async (req, res) => {
  

    console.log(req.params.id);
    var  employer = await employerSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
   
    res.send({message:true})

  

})
  router.delete('/Delet/:id', async (req, res) => {
  
    const groupDelete = await employerSchema.deleteOne({ _id: req.params.id }).then(async (group) => {
      var  employers = await employerSchema.find();
      res.send(employers)
    })
     
    })
router.get('/:id', async (req, res) => {
    console.log("habib")
  var employer=  await employerSchema.findById(req.params.id)
   res.send(employer)
  

})
router.get('/', async (req, res) => {
  console.log("habib")
var employers=  await employerSchema.find()
 res.send(employers)


})


router.post('/login', async (req, res) => {
   
   
  try {
      var employer = await employerSchema.findOne({ login: req.body.login })

       
      if (employer) {
         
      
          if (employer.password == req.body.password) {

            
              // res.send({token: token})  pour envoyer comme objet  json 
              res.send({ message: true , employer: employer._id})
          }
          else { //res.status(201).send("mots de passe incorrect")
              return res.send({ message: false })
          }

      }
      else {
          return res.send({ message: false })
      }

  } catch (error) {
      res.send(error.message)
  }

});
module.exports = router;
