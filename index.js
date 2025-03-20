const express = require('express')//obligtoir mil module express
var bodyParser = require('body-parser');//yrdha json mhma knyt yli jya
const app = express();//kima hekka express module  le routre
const uuid = require('uuid-v4');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path=require('path');
const uploadDirectory = path.join(__dirname, 'uploads');
const { StreamClient } = require('@stream-io/node-sdk');

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const fs = require('fs')

// Configurer Cloudinary avec vos clés d'API
cloudinary.config({
  cloud_name: 'dd8zymrzq',
  api_key: '872236541994287',
  api_secret: 'vuisJwEo2Be_qMcnWEmPhakQTyIE',
});

// Endpoint pour le téléchargement d'images

//llll
//activer les api
//aaaa
//const port=3000//y
// app.use(express.json({ extended: false, limit: '50mb' }))
// app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))
// app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
// app.use(bodyParser.json())
app.use(express.json({ extended: false, limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb', extended: false, parameterLimit: 50000 }))
 const connect = require('./dataBase/connect')
const user=require('./router/userApi')
const prod=require('./router/prodApi.js')
const pub=require('./router/pubApi.js')
const chat=require('./router/chatApi.js')
const cat=require('./router/catigorieApi.js')
const noti=require('./router/notiApi.js')
const landing=require('./router/lindingApi.js')
const emp=require('./router/empApi.js')
const rev=require('./router/revApi.js')
var admin = require("firebase-admin");
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use('/user',user);
app.use('/prod',prod);
app.use('/cat',cat);
app.use('/pub',pub);
app.use('/not',noti);
app.use('/laniding',landing);
app.use('/emp',emp);
app.use('/rev',rev);
app.use('/chat',chat);
app.use('/uploads', express.static(uploadDirectory));


let img;
// Configurer Multer pour gérer les téléchargements
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename:  (req, file, cb) => {
    img=file.fieldname + '-' + Date.now() + path.extname(file.originalname)
         console.log(file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    cb(null,img);
  
  }
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Seules les images sont autorisées !'));
  }
};
const upload = multer({ storage: storage });
const upload2 = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite à 5MB par fichier
  fileFilter: fileFilter
});

// Définir la route pour le téléchargement de fichiers
app.post('/upload', upload.single('image'), (req, res) => {
  // Gérer la réponse après le téléchargement du fichier
  res.send({message:'Fichier téléchargé avec succès',img:img});
})
app.post('/uploadPlusieur', upload.array('images', 10), (req, res) => {
  try {
    const fileNames = req.files.map(file => file.filename);
    res.status(200).json({
      message: 'Images téléchargées avec succès !',
      files: fileNames
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

app.post('/get-token', (req, res) => {
    const { userId,key,secret } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const apiKey = key;
    const apiSecret = secret;

    const client = new StreamClient(apiKey, apiSecret);

    const validity = 24 * 60 * 60;

    const token = client.generateUserToken({ user_id: userId, validity_in_seconds: validity });

    res.json({ token });
})

const port = process.env.PORT || 5900;
app.listen(port,"0.0.0.0",()=>console.log(`Server listen on the port ${port}`)) ;
