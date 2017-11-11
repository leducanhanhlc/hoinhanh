function q_sort(arr, _left, _right){
    if (_left < _right) {
        var mid = (_left + _right) / 2,
            cur = _left,
            i;
        for (i = _left; i <= _right; i++)
            if (arr[i] < arr[_right]) {
                swap(arr, i, cur);
                cur++;
            }
        swap(arr, cur, _right);
        q_sort(arr, _left, cur - 1);
        q_sort(arr, cur + 1, _right);
    }
}

function swap(arr, _a, _b) {
    var tmp = arr[_a];
    arr[_a] = arr[_b];
    arr[_b] = tmp;
}
function _print(arr)
{
    var len = arr.length,
        i;
    for(i = 0; i < len; i ++)
        console.log(arr[i]);
}

exports.q_sort = q_sort;