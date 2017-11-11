
var admin = require("firebase-admin");
var hashmudule = require('../model/hashmodule');


var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hoinhanh-c7faa.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("server/saving-data");
var arr = [];

function save(data) {
    ref.push({
        ques : data.ques,
        ans : data.ans
    });
    console.log("saved");
}

function retrievfirebasedata() {
    ref.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {// ...
            var ans = childSnapshot.child('ans').val();
            var ques = childSnapshot.child('ques').val();
            arr.push({ans : ans, ques : ques});
        });
    });
    console.log("Get Retrievfirebasedata Success");
}

function answer(str) {
    var result = "";
    var maxsimilarity = 0;
    for(i = 0; i < arr.length; i++) {
        var _similarity = hashmudule.similarity(str, arr[i].ques);
        var res = _similarity / str.length;
        if(res > maxsimilarity && res > 0.8) {
            maxsimilarity = res;
            result = arr[i].ans;
        }
    }
    if(maxsimilarity == 0) return ("Bạn hỏi câu khác đi");
    return result;
}

exports.save = save;
exports.retrievfirebasedata = retrievfirebasedata;
exports.answer = answer;