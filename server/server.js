const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const assert = require('assert');
const http = require('http');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const url = 'mongodb://localhost:27017';
const dbName = 'WishListMaker';
const nodemailer = require('nodemailer');

const findAll = (db, store, callback) => {
  const collection = db.collection(store);
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
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
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    let check = false;
    findAll(db, 'users', (data) => {
      for (let i of data) {
        if (i.email === email) {
          check = true;
        }
      }
      let result = JSON.stringify(check);
      return res.end(result);
    });
    client.close();
  });
});

app.post('/registration', (req, res) => {
  let user = req.body;
  user.token = guid();
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('users');
    collection.insertOne(user, (err, results) => {
      res.end(JSON.stringify(user.token))
    });
  });
});


app.post('/localization', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);

    findAll(db, 'localization', (data) => {
      let result = JSON.stringify(data);
      return res.end(result);

    });
    client.close();
  })
});


app.post('/authorization', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    findAll(db, 'users', (data) => {
      let token = '';
      for (let i of data) {
        if (i.email === req.body.email && i.password === req.body.password) {
          token = i.token;
        }
      }
      let result = JSON.stringify(token);
      return res.end(result);
    });
    client.close();
  })
});

app.post('/getuseremail', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    findAll(db, 'users', (data) => {
      let email = '';
      for (let i of data) {
        if (i.token === req.body.token) {
          email = i.email;
        }
      }
      let result = JSON.stringify(email);
      return res.end(result);
    });
    client.close();
  })
});

app.post('/getuser', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    findAll(db, 'users', (data) => {
      let user = '';
      for (let i of data) {
        if (i.token === req.body.token) {
          user = i;
        }
      }
      let result = JSON.stringify(user);
      return res.end(result);
    });
    client.close();
  })
});


app.post('/getwishes', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    MongoClient.connect(url, (err, client) => {
      assert.equal(null, err);
      const db = client.db(dbName);

      findAll(db, 'wishes', (data) => {
        let arr = [];
        for (let i of data) {
          if (i.userToken === req.body.token) {
            arr.push(i);
          }
        }
        let result = JSON.stringify(arr);
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


app.post('/upload', upload.single('file'), (req, res) => {
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

app.post('/addwishes', (req, res) => {
  let wish = req.body.wish;
  delete wish._id;
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('wishes');
    collection.insertOne(wish, (err, results) => {
      res.end();
      client.close();
    });
  });
});

app.post('/deletewishes', (req, res) => {
  let id = req.body.id;
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    findAll(db, 'wishes', (data) => {
      for (let i of data) {
        if (i._id.toString() === id) {
          db.collection("wishes").deleteOne({_id: i._id}, (err, result) => {
            client.close();
          });
        }
      }
    });
  });
});

app.post('/deleteuser', (req, res) => {
  let token = req.body.token;
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    findAll(db, 'users', (data) => {
      for (let i of data) {
        if (i.token.toString() === token) {
          db.collection("users").deleteOne({token: i.token}, (err, result) => {
            client.close();
          });
        }
      }
    });
  });
});


app.post('/addwishlists', (req, res) => {
  let wishList = req.body.wishList;
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('wishlists');
    collection.insertOne(wishList, (err, results) => {
      res.end();
      client.close();

      nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          // port: 465,
          // secure: false, // true for 465, false for other ports
          service: "Gmail",
          auth: {
            user: "vladzimir.griboedov@gmail.com", // generated ethereal user
            pass: "MP1257723" // generated ethereal password
          }
        });

        let mailOptions = {
          from: '"WishListMaker" <vladzimir.griboedov@gmail.com>', // sender address
          to: wishList.members, // list of receivers
          subject: 'You are invated to participate in te new wishlist', // Subject line
          text: 'You are invated to participate in te new wishlist', // plain text body
          html: `<h2>Hello, Bro!</h2>
<h3>You are invated to participate in te new wishlist!</h3>
<h4>"${wishList.name}" wishlist create by ${wishList.maker} </h4>
<p>You can go to  <a href="http://localhost:5051/wishlists/${wishList.url}">link</a> and see this.</p>
<h3>Good wishes!</h3>
<hr>
<p>© WishListMaker, 2018</p>`// html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
        });
      });

    });
  });
});

app.post('/getwishlists', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    MongoClient.connect(url, (err, client) => {
      assert.equal(null, err);
      const db = client.db(dbName);

      findAll(db, 'wishlists', (data) => {
        let arr = [];
        for (let i of data) {
          if (i.userToken === req.body.token) {
            arr.push(i);
          }
        }
        let result = JSON.stringify(arr);
        return res.end(result);
      });
      client.close();
    });
    client.close();
  });
});

app.post('/getwishlist', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    MongoClient.connect(url, (err, client) => {
      assert.equal(null, err);
      const db = client.db(dbName);

      findAll(db, 'wishlists', (data) => {
        let wishlist = [];
        for (let i of data) {
          if (i.url === req.body.id) {
            wishlist = i;
          }
        }
        let result = JSON.stringify(wishlist);
        return res.end(result);
      });
      client.close();
    });
    client.close();
  });
});

app.post('/getfollowwishlists', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    MongoClient.connect(url, (err, client) => {
      assert.equal(null, err);
      const db = client.db(dbName);

      findAll(db, 'wishlists', (data) => {
        let wishlist = [];
        for (let i of data) {
          if (i.members.includes(req.body.email)) {
            wishlist.push(i);
          }
        }
        let result = JSON.stringify(wishlist);
        return res.end(result);
      });
      client.close();
    });
    client.close();
  });
});

app.post('/deletewishlist', (req, res) => {
  let id = req.body.id;
  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    findAll(db, 'wishlists', (data) => {
      for (let i of data) {
        if (i._id.toString() === id) {
          db.collection("wishlists").deleteOne({_id: i._id}, (err, result) => {
            client.close();
          });
        }
      }
    });
  });
});

app.post('/updatewishlists', (req, res) => {
  let wishList = req.body.wishList;
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection('wishlists');
    collection.updateOne(
      {url: wishList.url},
      {$set: {wishes: wishList.wishes}},
      () => {
        client.close();
      }
    )
  });
});

app.post('/updateuser', (req, res) => {
  let user = req.body.user;
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection('users');
    collection.updateOne(
      {token: user.token},
      {$set: {
          name: user.name,
          email: user.email,
          password: user.password,
          sex: user.sex,
          avatar: user.avatar,
      }},
      () => {
        client.close();
      }
    )
  });
});



app.listen(8080, () => {
  console.log('We are live on ' + 8080);
});
