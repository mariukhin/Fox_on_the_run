
var keys = {
  'W' : 87,
  'S' : 83,
  'A' : 65,
  'D' : 68
};

var keyDown = {};//хранит текущую клавишу
var setKey = function (keyCode) {//передает скан-код клавиши
    keyDown[keyCode] = true;
};

var clearKey = function (keyCode) {
    keyDown[keyCode] = false;
};
//проверяет нажата ли какая-то клавиша в текущий момент
var isKeyDown = function (keyName) {
    return keyDown[keys[keyName]] == true;
};
//если есть функция engine запускает её
var gameEngine = function () {
    if(typeof engine == 'function')
        engine();
    else
        document.body.innerHTML = 'Не определена ф-ия engine';
    requestAnimationFrame(gameEngine);
};
window.onload = function () {
    window.onkeydown = function (e) {
        setKey(e.keyCode);
    };
    window.onkeyup = function () {
        clearKey(e.keyCode);
    };
    gameEngine();
};
