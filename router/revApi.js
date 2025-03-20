const express = require('express')
const router = express.Router();

const lodash = require('lodash')
const revSchema = require('../models/rev.js')
const userSchema = require('../models/user.js')
const pubSchema = require('../models/pub.js')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tab = []
// async function func(){

// var a="65a4f993275b403a456edbe7"
//     var rev= await revSchema.create( {
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
//    await userSchema.findByIdAndUpdate({ _id:a}, { $push: { reviews: rev._id } })


// }
// func()
console.log("declarer super rev")
router.get('/', async (req, res) => {

    var revs = await revSchema.find()
    res.send(revs)

});
router.get('/aaa', async (req, res) => {

    res.send(tab)

});
router.post('/zap', async (req, res) => {
    const dynamicData = req.body
    // var rev= await pubSchema.create({dynamicData})

    // var rev= await pubSchema.create(JSON.parse(req.body))

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
    var rev = await revSchema.findById(req.params.id)

    res.send(rev)

})


router.get('/user/:forUserId', async (req, res) => {
    try {
        const reviews = await revSchema.find({ forUserId: req.params.forUserId }).populate("sender")
        res.send(reviews);
    } catch (error) {
        res.status(500).send({ message: "Erreur serveur", error });
    }
})


router.post('/add', async (req, res) => {


    // console.log(req.body , typeOf(req.body))


    var rev = await revSchema.create(req.body)


    await userSchema.findByIdAndUpdate({ _id: req.body.userPosterId }, { $push: { reviews: rev._id } })
    res.send(rev)

});
router.put('/:id', async (req, res) => {
    try {
        var rev = await revSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.send({ message: true })



    } catch (error) {
        res.send(error.message)
    }

});
router.delete('/:id', async (req, res) => {
    try {
        var rev = await revSchema.findById(req.params.id)
        await userSchema.findByIdAndUpdate({ _id: rev.userPosterId }, { $pull: { reviews: rev._id } })

        const revDelete = await revSchema.deleteOne({ _id: req.params.id }).then(async (group) => {
            var revs = await revSchema.find();
            res.send(revs)
        })




    } catch (error) {
        res.send(error.message)
    }

});


module.exports = router;
