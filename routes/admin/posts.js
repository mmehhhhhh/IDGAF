var express = require('express');
var monogoClient = require("mongodb").MongoClient;
const DB_STR ="mongodb://localhost:27017/myboke"
var ObjectId = require("mongodb").ObjectId;
var router = express.Router();
router.get('/',function (req,res,next) {
    var id = req.query.id;
    monogoClient.connect(DB_STR,function (err,client) {
        if(err){
            res.send(err)
            return;
        }
        var db =client.db('myboke')
        var c =db.collection('posts');
        c.find({_id:ObjectId(id)}).toArray(function (err,docs) {
            if(err){
                res.send(err)
                return
            }
            res.render('home/article',{data:docs[0]});
        });
    });
    res.render('admin/article_list');
});
router.get('/add',function (req,res,next) {
   monogoClient.connect(DB_STR,function (err,client) {
       if(err){
           res.send(err)
           return;
       }
       var db =client.db('myboke')
       var c =db.collection("cats");
       c.find().toArray(function (err,docs){
           if(err) {
               res.send(err)
               return;
           }
           res.render('admin/article_add',{data:docs});
           })
       })
});
router.post('/add',function (req,res) {
    var cat =req.body.cat;
    var title=req.body.title;
    var summary=req.body.summary;
    var content = req.body.content;
    var time=new Date();
    var post = {
        "cat":cat,
        "title":title,
        "summary":summary,
        "content":content,
        "time":time
    }
    monogoClient.connect(DB_STR,function(err,client){
        if(err){
            res.send(err)
            return;
        }
        var db =client.db('myboke')
        var c =db.collection("posts");
        c.insert(post,function (err,result) {
            if(err){
                res.sent(err)
                return;
            }
            res.send('添加文章成功了<a href="/admin/posts">查看文章列表</a>')
        })
    })
})
module.exports = router;