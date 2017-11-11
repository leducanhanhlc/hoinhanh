
var q = require("./SORT");

var _input = "",
    _dbstr = "";

var _a = [0], // input string's hash
    _b = [0]; // database string's hash

var len1 = 0,
    len2 = 0;

var pow =[1];
var BASE = 10000019;

pow[1] = 307;

function make_hash(_str, _hash) {
    var i;
    var len = _str.length;
    _hash[0] = _str[0].charCodeAt(0);

    for( i = 1; i < len; i ++)
        _hash[i] = (_hash[i - 1] * pow[1] + _str[i].charCodeAt(0)) % BASE ;
}

function call_hash(_left, _right, _hash) {
    if (_left == 0) return _hash[_right];
    return (_hash[_right] - _hash[_left - 1] * pow[_right - _left + 1] + BASE * BASE) % BASE;
}

function binary(arr, _left, _right, val) {
    var l = _left,
        r = _right,
        m;
    while(l <= r) {
        m = parseInt((l + r )/ 2);
        if (arr[m] < val) l = m + 1;
        if (arr[m] > val) r = m - 1;
        if (arr[m] == val) return 1;
    }
    return 0;
}

function check(len) {
    var tmp = [0],
        lentmp = len2 - len + 1,
        i;

    for(i = 0; i + len - 1 < len2; i ++)           //  preparation
        tmp[i] = call_hash(i, i + len - 1, _b);    //  before
    q.q_sort(tmp, 0, lentmp - 1);                   //  searching

    for(i = 0; i + len - 1 < len1; i ++) {
        var val = call_hash(i, i + len - 1, _a);
        if (binary(tmp, 0, lentmp - 1, val) == 1) return 1;
    }
    //    for(j = 0; j + len - 1 < len2; j ++)
    //    if (call_hash(i, i + len - 1, _a) == call_hash(j, j + len - 1, _b)) return 1;
    return 0;

}
function similarity(str1, str2) {
    initial(str1, str2);
    var l = 1,
        r = min(len1, len2),
        m;
    var res = 0;

    while( l <= r) {
        m = parseInt((l + r) /2);
        if (check(m)) {
            l = m + 1;
            res = m;
        } else {
            r = m - 1;
        }
    }
    return res;
}

function min(_aa, _bb) {
    if (_aa < _bb) return _aa;
    return _bb;
}

function initial(str1, str2){
    var i;
    _input = str1.toLowerCase();
    _dbstr = str2.toLowerCase();
    len1 = str1.length;
    len2 = str2.length;
    for(i = 2; i <= 1000; i ++)
        pow[i] = (pow[i - 1] * pow[1]) % BASE;

    make_hash(_input, _a);
    make_hash(_dbstr, _b);
}

exports.similarity = similarity;
