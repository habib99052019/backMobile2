// const mongoose = require('mongoose');

// //mongoose.connect('mongodb+srv://habibfullstack90:suMi5SdKCbCXPyTx@cluster0.owwrwt9.mongodb.net/?retryWrites=true&w=majority',
// mongoose.connect('mongodb://webmaster:webmaster123@localhost:27017/e-comerce12',
// {useNewUrlParser: true, 
// useUnifiedTopology: true,
// }).then(()=>console.log('Successfully connected to database.')).catch((e)=>console.error('Error in connection',e));

// module.exports = mongoose;

const mongoose = require('mongoose');

//mongoose.connect('mongodb+srv://webmaster:webmaster123@cluster0.jc0r9.mongodb.net/backKoorea',
//?retryWrites=true&w=majori 
//mongodb+srv://habibfullstack90:<password>@cluster0.owwrwt9.mongodb.net/
//mongodb+srv://webmaster:webmaster123@cluster0.jc0r9.mongodb.net/comm10002
mongoose.connect('mongodb+srv://webmaster:webmaster123@cluster0.jc0r9.mongodb.net/tunisieSantté',
{useNewUrlParser: true, 
useUnifiedTopology: true,
}).then(()=>console.log('Successfully connected to database.')).catch((e)=>console.error('Error in connection',e));

module.exports = mongoose;
//https://koorea1.onrender.com
//password bavin :TV5tvQxC41UPn45A
//heartads : iRSqo1zU4qtLZzDo
