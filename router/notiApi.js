const express = require('express')
const router = express.Router();

const lodash=require('lodash')
const notiSchema = require('../models/noti.js')
const userSchema = require('../models/user.js')
const pubSchema = require('../models/pub.js')

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
router.post('/add',  async (req, res) => {
   
             
    // console.log(req.body , typeOf(req.body))
        
    
       var noti= await notiSchema.create(req.body)
       
     
       await userSchema.findByIdAndUpdate({ _id:req.body.userPosterId}, { $push: { notis: noti._id } })
       res.send(noti)
        
    });
    module.exports = router;