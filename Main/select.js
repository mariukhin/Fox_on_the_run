var mouse ={
    x : 0,
    y : 0
};

var selected = false;

var cnv = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = 500, height = 300;

cnv.width = width;
cnv.height = height;
cnv.style.backgroundColor = 'blue';

ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;


var drawRect = function (x, y, w, h) {
    ctx.fillRect(x,y,w,h);
};

var strokeRect = function (x, y, w, h) {
    ctx.strokeRect(x,y,w,h);
};

var Rect = function (x,y,w,h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.selected = false;
};

Rect.prototype = {
    draw : function () {
      drawRect(this.x, this.y, this.w, this.h);
    },

    stroke : function () {
        strokeRect(this.x, this.y, this.w, this.h);

    },

    select : function () {
        this.selected = !this.selected;
    }
};

var i = 0, rect = [];
for(;i<5;i++){
    rect.push(new Rect(50 + i*(50+10),40,50,50));
}
//////////---Для подсветки при нажатии---//////////////
// var isCursorInRect = function (x,y,rect) {
//     return x > rect.x && x < rect.x + rect.w &&
//         y >rect.y && y < rect.y + rect.h;
// };


///////---Для подсветки при наведении---//////////
var isCursorInRect = function (rect) {
    return mouse.x > rect.x && mouse.x < rect.x +
        rect.w && mouse.y > rect.y && mouse.y < rect.y +
        rect.h;
};

cnv.onclick = function (e) {
  var x = e.pageX,
      y = e.pageY;

    for(i in rect){
        if(isCursorInRect(x,y,rect[i]))
            rect[i].select();
    }
};

setInterval(function () {
  ctx.clearRect(0,0,width,height);
  for(i in rect){
      rect[i].draw();

      if(isCursorInRect(rect[i])){
          rect[i].stroke();
      }
     /* if(rect[i].selected)
        rect[i].stroke();*/

      // if(rect[2].selected) {
      //     alert("Третья кнопка");
      //     ctx.clearRect(0, 0, width, height);
      // }
  }

  if(selected){
      selected.x = mouse.x - selected.w/2;
      selected.y = mouse.y - selected.w/2;
  }

},30);

window.onmousemove = function (e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
};
window.onmousedown = function (e) {
    mouse.down = true;
    if(!selected){
        var i;
        for(i in rect){
            if(isCursorInRect(rect[i])){
                selected = rect[i];
            }
        }
    }
};

window.onmouseup = function () {
    mouse.down = false;
    selected = false;
};




