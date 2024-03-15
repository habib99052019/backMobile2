
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema  = new mongoose.Schema({
    userReceiv: {
            usid: String,
            username: String
        },
        userSend: {
            usid: String,
            username: String
        },
        product: {product object},
        msgs: []
    
  });
module.exports=mongoose.model('chatSchema',chatSchema);
