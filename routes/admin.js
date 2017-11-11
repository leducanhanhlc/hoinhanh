var express = require('express');
var router = express.Router();
var chia = require('../ducanh/chia');

/* GET home page. */
var content = [];
var arr = [];
var automode = 0;
router.get('/', function(req, res, next) {
    res.render('admin', {
        title : 'title',
    });
});

router.get('/nole' + chia.tsec, function (req, res, next) {
   res.render('nole', {});
});


router.post('/open/id=:id', function (req, res, next) {
    res.render('accessuser', {id : req.params.id});
});

router.post('/auto=:mode', function (req, res, next) {
    automode = req.params.mode;
    if(automode == 1) res.send("Auto bot is started, let sleeping boss");
    if(automode == 0) res.send("Changing mode please");
});



function checkconnected(_id) {
    return  arr[_id];
}

function add(_id) {
    arr[_id] = 1;
}

function pop(_id) {
    arr[_id] = 0;
}

function getautomode() {
    return automode;
}

exports.admin = router;
exports.checkconnected = checkconnected;
exports.add = add;
exports.pop = pop;
exports.getautomode = getautomode;

