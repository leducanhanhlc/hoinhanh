var firebase = require('../database/firebase');
var express = require('express');
var router = express.Router();
var chia = require('../ducanh/chia');
var app = require('../app');
var admin = require('../routes/admin');


/* GET home page. */
var id = 0;

router.get('/', function(req, res, next) {
  res.render('homepage', { title: 'Express'});
});

router.get('/user/:id', function (req, res, next) {
    setTimeout(function () {
        if((!admin.checkconnected(req.params.id))) {
            res.render('index', {title: 'Express', id: id});
        } else {
            res.send("dung` hack");
        }
    }, 1000);
});

function setid(_id) {
    id = _id;
    return _id;
}


exports.index = router;
exports.setid = setid;



