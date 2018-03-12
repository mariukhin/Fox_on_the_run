var position = document.getElementById('position');
var cursor = document.getElementById('cursor');
var pool = document.getElementById('pool');



var x = 0,y = 0, dX = 50;

position.innerHTML = 'Позиция курсора: ' + x + '/' + y;

setInterval(function () {
    position.innerHTML = 'Позиция курсора: ' + x + '/' + y;
    cursor.style.left = x - 25 + 'px';
    cursor.style.top = y - 25 + 'px';
    dX += 1;
    pool.style.left = dX + 'px';

},1000/60);

pool.onmousemove = function (event) {
    x = event.pageX;
    y = event.pageY;
};
