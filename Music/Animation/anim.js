var canvas = document.getElementById('canvas');
function launchFullScreen(element) {
    if(element.requestFullScreen){
        element.requestFullScreen();
    }else if(element.mozRequestFullScreen){
        element.mozRequestFullScreen();
    }else if(element.webkitRequestFullScreen){
        element.webkitRequestFullScreen();
    }
}

function cancelFullScreen() {
    if(document.cancelFullScreen){
        document.cancelFullScreen();
    }else if(document.mozCancelFullScreen){
        document.mozCancelFullScreen();
    }else if(document.webkitCancelFullScreen){
        document.webkitCancelFullScreen();
    }
}

canvas.onclick = function () {
    launchFullScreen(document.body);//все эелементы в полноэкранный режим
    /*canvas.onclick = function () {
        cancelFullScreen();
    };*/
};

var onfullscreenchange = function () {
    var fullscreenElement =
        document.fullscreenElement ||
        document.mozFullscreenElement ||
        document.webkitFullscreenElement;
    var fullscreenEnabled =
        document.fullscreenEnabled ||
        document.mozFullscreenEnabled ||
        document.webkitFullscreenEnabled;
    console.log('fullscreenEnabled = ' + fullscreenEnabled + ', fullscreenElement = ' + fullscreenElement);
}

canvas.addEventListener("webkitfullscreenchange", onfullscreenchange);
canvas.addEventListener("mozfullscreenchange", onfullscreenchange);
canvas.addEventListener("fullscreenchange", onfullscreenchange);


var context = document.getElementById('canvas').getContext('2d');
var width = 100, height = 100;

/*
var x = 0;
var i = 1;
setInterval(function () {
    drawPic('1-3.png',i,3);
    if(i>=5) i = 1;
    else i++;
},200);
*/
var horse = loadImage('1-3.png',105,70,5);
var horse2 = loadImage('1-3.png',105,70,5);
setInterval(function () {
    context.clearRect(0,0,200,100);
    drawPic(horse,0,0);
    drawPic(horse2,500,0,'canvas2');
},200);

function drawPic(img, x, y,cnv) {
    if(!img.loaded) return;
    if(img.num >= img.count) img.num = 1;
    else img.num += 1;

    if(cnv)
        document.getElementById(cnv).getContext('2d').drawImage(img.dom, img.width*(img.num-1), 0, img.width, img.height, x, y, 105, 70);
    else
        context.drawImage(img.dom, img.width*(img.num-1), 0, img.width, img.height, x, y, 105, 70);
}
function loadImage(path, width, height, count) {
    var pic1 = document.createElement('img');
    var result ={
        dom : pic1,
        width : width,
        height : height,
        count : count,
        loaded : false,
        num : 1
    };
    pic1.onload = function () {
        result.loaded = true;
    };
    pic1.src = path;

    return result;
}



/*function drawPic(img, x, y) {
    num = num ? num-1 : 0;
    x += speed ? speed : 0;
    pic1.onload = function () {
        width = pic1.width;
        height = pic1.height;
        context.clearRect(0,0,400,100);
        /!*
        Первый аргумент -  какая картинка
        Второй и третий аргумент - место начала отрисовки(х и у координаты)
        Четвертый и пятый аргументы - размер картинки какую увидет пользователь
        6 и 7 аргументы верхний левый угол
        8 и 9 - ширина и высота изображения которое нужно взять
        *!/
        context.drawImage(pic1,105*num,0,105,70,0,0,105,70);

        pic1.style.display = 'none';
    };
    pic1.src = img;
}*/

/*pic2.onload = function () {
    context.drawImage(pic2,
}*/
