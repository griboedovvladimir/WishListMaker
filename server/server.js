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
const findWishes = (db, callback) => {
  const collection = db.collection('wishes');
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


app.get('/authorization/:id', (req, res) => {
  let email = String(req.params.id.slice(1));
  MongoClient.connect(url, (err, client)=>{
    assert.equal(null,err);
    console.log('Connected seccessful to server');
    const db = client.db(dbName);
let check = false;
    findUser(db,(data)=>{
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
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    console.log('Connected seccessful to server');
    const db = client.db(dbName);
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
  });

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

app.post('/getwishes',(req,res)=>{
 console.log(req.body);
  MongoClient.connect(url, (err, client)=>{
    assert.equal(null,err);
    console.log('Connected seccessful to server');
    const db = client.db(dbName);
    findWishes(db,(data)=>{
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
});

app.listen(8080,()=>{
  console.log('We are live on ' + 8080);
});
