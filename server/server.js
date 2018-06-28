const express = require('express');
const fs = require('fs');
const cors = require('cors');
const MongoClient = require ('mongodb').MongoClient;
const bodyParser = require('body-parser');
const assert = require ('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'WishListMaker';
const findDocuments = (db, callback) => {
  const collection = db.collection('localization');
  collection.find({}). toArray((err, docs)=>{
    assert.equal(err,null);
    callback(docs);
  })
};
const findUser = (db, callback) => {
  const collection = db.collection('users');
  collection.find({}). toArray((err, docs)=>{
    assert.equal(err,null);
    callback(docs);
  })
};


const app = express();
app.use(cors());


// app.get('/users', (req, res) => {
//     let readStream = fs.createReadStream('./users.json');
//     readStream.pipe(res);
// });
// app.get('/user/:id', (req, res) => {
//     fs.readFile('./users.json', (err, data) => {
//         if (!err) {
//             let users = JSON.parse(data.toString());
//             let user = users.find(u => u.id === Number(req.params.id));
//             if (user) {
//                 res.writeHead(200, 'OK', {
//                     'Content-type': 'application/json; charset=utf-8'
//                 });
//                 res.end(JSON.stringify(user));
//                 return
//             }
//         }
//         res.writeHead(404);
//         res.end();
//
//
//     });
// });

app.post('/localization',(req,res)=>{
  MongoClient.connect(url, (err, client)=>{
    assert.equal(null,err);
    console.log('Connected seccessful to server');
    const db = client.db(dbName);

    findDocuments(db,(data)=>{
      let result=JSON.stringify(data);
      return res.end(result);

    });
    client.close();
  })
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.post('/authorization',(req,res)=>{
  MongoClient.connect(url, (err, client)=>{
    assert.equal(null,err);
    console.log('Connected seccessful to server');
    const db = client.db(dbName);


    findUser(db,(data)=>{
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

app.listen(8080,()=>{
  console.log('We are live on ' + 8080);
});
