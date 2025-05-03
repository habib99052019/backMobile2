const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prodSchema = new mongoose.Schema({

  title: String,
  userPosterId: { type: Schema.Types.ObjectId, ref: 'userSchema' }, // id user li habit l post
  description: String,
  isPub: Boolean,
  images: [],
  caractes: [],
  statut: String,
  chat: [], /// kol produits aandou chat mte3ou ynijmou ykalmou akthir min wehed aala produit mte3ou,
  likes: Number,
  reviews: [],
  date: String,
  ville: String,
  city: String, /// kol produit aandou review mte3ou list fergha khaleha kima chat w caractes
  catigories: String,
  price: String,
  lienPub:String
})

module.exports = mongoose.model('prodSchema', prodSchema);
