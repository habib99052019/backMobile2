const express = require('express')
const router = express.Router();

const lodash = require('lodash')
const notiSchema = require('../models/noti.js')
const userSchema = require('../models/user.js')
const pubSchema = require('../models/pub.js')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.get('/', async (req, res) => {
    var notis = await notiSchema.find().populate("product")
    res.send(notis)
})
router.get('/userNoti/:id', async (req, res) => {
    var user = await userSchema.findById(req.params.id).populate('notis');
    res.send(user)
})
router.get('/:id', async (req, res) => {
    var noti = await notiSchema.findById(req.params.id)
    res.send(noti)
})
router.post('/add', async (req, res) => {

    // console.log(req.body)

    var noti = await notiSchema.create(req.body)

    res.send(noti)

});
router.put('/:id', async (req, res) => {
    try {
        var noti = await notiSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.send({ message: true })



    } catch (error) {
        res.send(error.message)
    }

});
router.delete('/:id', async (req, res) => {
    try {
        var noti = await notiSchema.findById(req.params.id)
        const notiDelete = await notiSchema.deleteOne({ _id: req.params.id }).then(async (group) => {
            var notis = await notiSchema.find();
            res.send(notis)
        })




    } catch (error) {
        res.send(error.message)
    }

});
module.exports = router;