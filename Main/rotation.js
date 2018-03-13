var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = 500,
    height = 500;

canvas.width = width;
canvas.height = height;
canvas.style.backgroundColor = '#990000';

var drawRect = function (x,y,w,h,a) {
  var dx = x + w/2;
  var dy = y + h/2;

  if(a){
    a = a * (Math.PI / 180);
    ctx.save();
    ctx.translate(dx,dy);//функция сдвига оси координат канваса
    ctx.rotate(a);
    ctx.translate(-dx,-dy);
  }
  ctx.strokeRect(x,y,w,h);

  if(a){
    ctx.restore();//восстановление канваса
  }
};

var x = 10,
    y = 10,
    a = 0;

setInterval(function () {
    ctx.clearRect(0,0,width,height);
    drawRect(x,y,50,50,a);
    drawRect(50,150,50,50,-a);
    drawRect(200,150,50,50,a);
    drawRect(400,250,50,50,-a);
    drawRect(100,300,50,50,a);


    x++;
    y++;
    a += 1;

},60);
