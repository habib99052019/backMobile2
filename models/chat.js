
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new mongoose.Schema({
    dateSending: String,
    userReceiv: { type: Schema.Types.ObjectId, ref:'userSchema'},
    userSend: { type: Schema.Types.ObjectId, ref:'userSchema'},
    product: { type: Schema.Types.ObjectId, ref: 'prodSchema' },
    msgs: [],
    view:Boolean
    
});
module.exports = mongoose.model('chatSchema', chatSchema);
