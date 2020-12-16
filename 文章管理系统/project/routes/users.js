var express = require('express');
var router = express.Router();
var model = require('../model')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 注册接口
router.post('/regist', function(req, res, next) {
  var data = {
    username: req.body.username,
    password: req.body.password,
    confirmpwd: req.body.confirmpwd,
    email: req.body.email
  }

  //需要数据校验

  model.connect(function(db){
    db.collection('users').insertOne(data, function(err, ret){
      if(err){
        console.log('注册失败');
        res.redirect('/regist')
      } else {
        res.redirect('/login')
      }
    })
  })
})

// 登录接口
router.post('/login', function(req, res, next) {
  var data = {
    username: req.body.username,
    password: req.body.password
  }

  // 数据校验

  model.connect(function(db) {
    db.collection('users').find(data).toArray(function(err, docs){
      if (err) {
        res.redirect('/login')
      } else {
        if(docs.length > 0){
          // 登陆成功 进行session存储
          req.session.username = data.username
          res.redirect('/')
        } else {
          res.redirect('/login')
        }
      }
    })
  })

  console.log('用户登陆', data);
});

// 退出登陆
router.get('/logout', function(req, res, next) {
  req.session.username = null
  res.redirect('/login')
});
module.exports = router;
