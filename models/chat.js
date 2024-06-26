
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema  = new mongoose.Schema({
    dateSending:String,
    userReceiv: {
            usid: String,
            username: String,
        image: String 
        },
        userSend: {
            usid: String,
            username: String,
            image: String 
        },
        product: { type: Schema.Types.ObjectId, ref:'prodSchema'},
        msgs: []
    
  });
module.exports=mongoose.model('chatSchema',chatSchema);
