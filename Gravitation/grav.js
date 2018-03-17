var mouse ={
    x : 0,
    y : 0
};


var cnv = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = 500, height = 350;

cnv.width = width;
cnv.height = height;
cnv.style.backgroundColor = 'black';

//ctx.fillStyle = 'black';
ctx.strokeStyle = 'yellow';
ctx.lineWidth = 2;

var clear = function () {
    ctx.clearRect(0,0,width,height);
};

var fillRect = function (x, y, w, h) {
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
    this.dif = 0.1;

    this.fall = true;
};

Rect.prototype = {
    draw : function () {
        fillRect(this.x, this.y, this.w, this.h);
    },

    move : function () {
        this.x += this.dx;
        this.y += this.dy;
    },
    
    grav : function () {

        if(!this.fall) return;

        if(this.y + this.h/1.5 > height - 100){
            this.max = 2;
            this.dif = 0.01;
        }
        if(this.dy > this.max){
            this.dy = 0;
        }
        this.dy += this.dy <= this.max ? this.dif : 0;

        if(this.y + this.h >= height) {
            this.y = height -  + this.h;
         //Чтобы отскакивали//
            // this.dy /= 2;
            // this.dy *= -1;
            this.dy = 0;
        }
        if(Math.abs(this.dy) < this.dif *2 &&
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

    ctx.globalAlpha = 1;//прозрачность
    ctx.fillStyle = 'yellow';
    for(i in rect){
        rect[i].grav();
        rect[i].move();
        rect[i].draw();

    }
    strokeRect(mouse.x - 15, mouse.y - 15, 30,30);

    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#88DBFF';
    fillRect(0, height - 100, width, height);
    ctx.fillStyle = '#0000CC';
    fillRect(0, height - 70, width, height);
    ctx.fillStyle = '#000066';
    fillRect(0, height - 30, width, height);


},1000/60);





