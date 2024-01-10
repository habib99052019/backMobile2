console.log("welcom mr taher")
const express = require('express')//obligtoir mil module express
var bodyParser = require('body-parser');//yrdha json mhma knyt yli jya
const app = express();//kima hekka express module  le routre
const uuid = require('uuid-v4');

//llll
//activer les api
//aaaa
//const port=3000//y
app.use(express.json({ extended: false, limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
// app.use(bodyParser.json())
app.use(express.json({ extended: false, limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))
 const connect = require('./dataBase/connect')
const user=require('./router/userApi')
const prod=require('./router/prodApi.js')
const pub=require('./router/pubApi.js')
const cat=require('./router/catigorieApi.js')
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


var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://imagestorge-f1442.appspot.com"
});
app.post('/upload', async (req, res) => {
bucket = admin.storage().bucket();


 const filename=req.body.path


  const metadata = {
    metadata: {
      // This line is very important. It's to create a download token.
      firebaseStorageDownloadTokens: uuid()
    },
    contentType: `image/${req.body.type}`,
    cacheControl: 'public, max-age=31536000',
  };

  // Uploads a local file to the bucket
  await bucket.upload(filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    metadata: metadata,
  });

res.send({source:`https://firebasestorage.googleapis.com/v0/b/imagestorge-f1442.appspot.com/o/${req.body.originaleName}.png?alt=media&token=91837f7f-c9f0-404a-877e-babf61a7c4cf
`});

})
//routes
// "bcrypt": "^5.0.0",
// "body-parser": "^1.19.0",
// "express": "^4.17.1",
// "jsonwebtoken": "^8.5.1",
// "lodash": "^4.17.20",
// "mongoose": "^5.11.14",
// "node-cron": "^3.0.0",
// "nodemailer": "^6.6.2",
// "nodemon": "^2.0.9",
// "passport": "^0.4.1",
// "passport-http-bearer": "^1.0.1",
// "sync": "^0.2.5",
// "synchronous-promise": "^2.0.15",
// "xlsx": "^0.17.1"
// app.listen(port,'127.0.0.1',()=>console.log('Server listen on the port ',port)) ;

const port = process.env.PORT || 5900;
app.listen(port,()=>console.log(`Server listen on the port ${port}`)) ;