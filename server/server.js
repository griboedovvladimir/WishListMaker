const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');
const MongoClient = require ('mongodb').MongoClient;
const bodyParser = require('body-parser');
const assert = require ('assert');
const http = require('http');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const url = 'mongodb://localhost:27017';
const dbName = 'WishListMaker';

const findAll = (db, store , callback) => {
  const collection = db.collection(store);
  collection.find({}). toArray((err, docs)=>{
    assert.equal(err,null);
    callback(docs);
  })
};
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}



const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(express.static('img'));

app.get('/authorization/:id', (req, res) => {
  let email = String(req.params.id.slice(1));
  MongoClient.connect(url, (err, client)=>{
    assert.equal(null,err);
    console.log('Connected seccessful to server');
    const db = client.db(dbName);
let check = false;
    findAll(db, 'users' ,(data)=>{
      for (let i of data){
        if (i.email === email){
          check = true;
        }
      }
      let result=JSON.stringify(check);
      return res.end(result);
    });
    client.close();
  });
});

app.post('/registration',(req,res)=> {
    let user = req.body;
    user.token = guid();
    MongoClient.connect(url, (err, client)=>{
      assert.equal(null,err);
      console.log('Connected seccessful to server');
      const db = client.db(dbName);
const collection = db.collection('users');
collection.insertOne(user,(err,results)=>{
  res.end(JSON.stringify(user.token))
});
      });
  });


app.post('/localization',(req,res)=>{
  MongoClient.connect(url, (err, client)=>{
    assert.equal(null,err);
    console.log('Connected seccessful to server');
    const db = client.db(dbName);

    findAll(db,'localization',(data)=>{
      let result=JSON.stringify(data);
      return res.end(result);

    });
    client.close();
  })
});



app.post('/authorization',(req,res)=>{
  MongoClient.connect(url, (err, client)=>{
    assert.equal(null,err);
    console.log('Connected seccessful to server');
    const db = client.db(dbName);
    findAll(db,'users',(data)=>{
      let token='';
      for (let i of data){
        if (i.email === req.body.email && i.password === req.body.password){
          token = i.token;
        }
      }
      let result=JSON.stringify(token);
      return res.end(result);
    });
    client.close();
  })
});

app.post('/getwishes',(req,res)=>{
  MongoClient.connect(url, (err, client)=>{
    assert.equal(null,err);
    console.log('Connected seccessful to server');
    const db = client.db(dbName);
    MongoClient.connect(url, (err, client)=>{
      assert.equal(null,err);
      console.log('Connected seccessful to server');
      const db = client.db(dbName);

    findAll(db, 'wishes',(data)=>{
      let arr=[];
      for (let i of data){
        if (i.userToken === req.body.token){
          arr.push(i);
        }
      }
      let result=JSON.stringify(arr);
      return res.end(result);
    });
    client.close();
  });
    client.close();
  });
});


/////////////////////////////
// let file = fs.createWriteStream("img/file.jpg");
// let request = http.get('http://ptel.cz/wp-content/uploads/2017/04/jazz.jpg', function(response){
//   response.pipe(file);
// });

////////////////////////////////////////////////


const DIR = './img';
let fileName;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    fileName = file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
  }
});
let upload = multer({storage: storage});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5051');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.post('/upload',upload.single('file'),  (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    return res.send({
      success: true,
      filename: fileName
    })
  }
});

app.post('/addwishes',  (req, res) =>{
    let wish = req.body.wish;
    delete wish._id;
    MongoClient.connect(url, (err, client)=>{
      assert.equal(null,err);
      const db = client.db(dbName);
      const collection = db.collection('wishes');
      collection.insertOne(wish,(err,results)=>{
        res.end()
      });
    });
  });

app.post('/deletewishes',  (req, res) =>{
  let id = req.body.id;
  MongoClient.connect(url, (err, client)=>{
    assert.equal(null,err);
    const db = client.db(dbName);
    findAll(db, 'wishes' ,(data)=>{
      for (let i of data){
        if (i._id.toString() === id){
          db.collection("wishes").deleteOne({_id: i._id}, (err,result) =>{
            client.close();
          });
        }
      }
    });
  });
});

app.post('/addwishlists',  (req, res) =>{
  let wishList = req.body.wishList;
  MongoClient.connect(url, (err, client)=>{
    assert.equal(null,err);
    const db = client.db(dbName);
    const collection = db.collection('wishlists');
    collection.insertOne(wishList,(err,results)=>{
      res.end()
    });
  });
});

app.post('/getwishlists',(req,res)=>{
  MongoClient.connect(url, (err, client)=>{
    assert.equal(null,err);
    console.log('Connected seccessful to server');
    const db = client.db(dbName);
    MongoClient.connect(url, (err, client)=>{
      assert.equal(null,err);
      console.log('Connected seccessful to server');
      const db = client.db(dbName);

      findAll(db, 'wishlists' ,(data)=>{
        let arr=[];
        for (let i of data){
          if (i.userToken === req.body.token){
            arr.push(i);
          }
        }
        let result=JSON.stringify(arr);
        return res.end(result);
      });
      client.close();
    });
    client.close();
  });
});


app.listen(8080,()=>{
  console.log('We are live on ' + 8080);
});
