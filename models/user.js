const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  userSchema  = new mongoose.Schema({
    username:String,
    fullName:String,
    email: String,
    reviews:[{ type: Schema.Types.ObjectId, ref:'revSchema'}],
    pseudoName:String,
    notis:[],
    historique:[],
    login:String,
    password:String, 
    token:String,
    chat:[],
    products:[{ type: Schema.Types.ObjectId, ref:'prodSchema'}], /// kima joueur fi eurobet les produits lina 3andhom schema khater kol produit aandou Id mte3ou
    favorites:[],
    active:Boolean,
    ville:String,
    city:String ,
    likes:[],
    appel:[],
    image :String ,
    localistion:{
      lang:Number,
      long:Number

    },
    
    detailsAppel:[]
   
  });
module.exports=mongoose.model('userSchema',userSchema);
