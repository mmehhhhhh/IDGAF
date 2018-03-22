var express = require('express');
var monogoClient = require("mongodb").MongoClient;
const DB_STR = "mongodb://localhost:27017/myboke"
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  monogoClient.connect(DB_STR,function (err,client) {
      if(err){
        res.send(err)
          return;
      }
      var db = client.db('myboke')
      var c=db.collection('posts');
      c.find().toArray(function (err,docs) {
          if(err){
            res.send(err)
              return;
          }
          var db = client.db('myboke')
          var c1 = db.collection('cats');
          if(err){
            res.send(err)
              return;
          }
          res.render('home/index',{data:docs,data1:result})
      })
  })
  res.render('home/index', { title: 'Express' });
});

module.exports = router;
