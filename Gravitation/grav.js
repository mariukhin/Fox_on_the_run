var mouse ={
    x : 0,
    y : 0
};


var cnv = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = 500, height = 350;

cnv.width = width;
cnv.height = height;
cnv.style.backgroundColor = 'green';

ctx.fillStyle = 'black';
ctx.strokeStyle = 'yellow';
ctx.lineWidth = 2;

var clear = function () {
    ctx.clearRect(0,0,width,height);
};

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

    this.dx = 0;
    this.dy = 0;

    this.max = 10;
    this.dd = 0.1;

    this.fall = true;
};

Rect.prototype = {
    draw : function () {
        drawRect(this.x, this.y, this.w, this.h);
    },

    move : function () {
        this.x += this.dx;
        this.y += this.dy;
    },
    
    grav : function () {

        if(!this.fall) return;
        this.dy += this.dy <= this.max ? this.dd : 0;

        if(this.y + this.h >= height) {
            this.y = height -  + this.h;
         //Чтобы отскакивали//
            // this.dy /= 2;
            // this.dy *= -1;
            this.dy = 0;
        }
        if(Math.abs(this.dy) < this.dd *2 &&
        this.y + this.h >= height){
            this.fall = false;
            this.dy = 0;
        }
    }
};

var  rect = [];

cnv.onmousemove = function (e) {
    mouse.x = e.pageX - 10;
    mouse.y = e.pageY - 10;
};

cnv.onclick = function () {
    rect.push(new Rect(mouse.x - 15,mouse.y - 15,30,30));
};

setInterval(function () {
    clear();
    for(i in rect){
        rect[i].grav();
        rect[i].move();
        rect[i].draw();

    }
    strokeRect(mouse.x - 15, mouse.y - 15, 30,30);

},1000/60);





