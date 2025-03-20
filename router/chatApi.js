const express = require('express')
const router = express.Router();
const lodash = require('lodash')
const chatSchema = require('../models/chat.js')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    var chats = await chatSchema.create(req.body)
    await res.status(200).json(req.body);


});
router.get('/', async (req, res) => {

    var chats = await chatSchema.find().populate('product')
    var chats2 = chats.sort((a, b) => new Date(b.dateSending).getTime() - new Date(a.dateSending).getTime());
    res.send(chats2)

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

    var chat = await chatSchema.findById(req.params.id).populate('product')
    res.send(chat)

})

router.get('/product/:productId', async (req, res) => {
    try {
        const chat = await chatSchema.findOne({ product: req.params.productId })
            .populate('product')
            .populate('userSend')
            .populate('userReceiv');

        res.send(chat);
    } catch (err) {
        res.send(err);
    }
})

router.get('/user/:userId', async (req, res) => {
    try {
        const chats = await chatSchema.find({
            $or: [
                { userSend: req.params.userId },
                { userReceiv: req.params.userId }
            ]
        })
        .populate('product')
        .populate('userSend')
        .populate('userReceiv');

        res.send(chats);
    } catch (err) {
        console.log(err)
        res.send(err);
    }
})

router.get('/prodUser/:productId/:userId', async (req, res) => {
    try {
        const { productId, userId } = req.params;

        const chat = await chatSchema.find({
            product: productId,
            $or: [
                { userSend: userId },
                { userReceiv: userId }
            ]
        })
        .populate('product')
        .populate('userSend')
        .populate('userReceiv');

        console.log(req.params)
        console.log(chat)

        res.send(chat);
    } catch (err) {
        res.send(err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        var chat = await chatSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.send({ message: true })



    } catch (error) {
        res.send(error.message)
    }

});
router.delete('/:id', async (req, res) => {
    try {
        const chatDelete = await chatSchema.deleteOne({ _id: req.params.id }).then(async (group) => {
            var chats = await chatSchema.find();
            res.send(chats)
        })




    } catch (error) {
        res.send(error.message)
    }

});
router.delete('/', async (req, res) => {
    try {
        const chatDelete = await chatSchema.deleteMany()

        res.send({ message: true })





    } catch (error) {
        res.send(error.message)
    }

});

module.exports = router;
