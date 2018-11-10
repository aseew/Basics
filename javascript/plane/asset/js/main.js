//获取页面元素
var contentDiv = document.getElementById('content');
var startDiv = document.getElementById('start');
var mainDiv = document.getElementById('main');
var scoreDiv = document.getElementById('score');
var suspendDiv = document.getElementById('suspend');
var continueDiv = document.getElementById('continue');
var settlementDiv = document.getElementById('settlement');

var score = 0;
//获取游戏界面的高度与宽度
var contentClass = contentDiv.currentStyle? contentDiv.currentStyle: window.getComputedStyle(contentDiv, null);
var stageSizeX = parseInt(contentClass.width);
var stageSizeY = parseInt(contentClass.height);

//创建飞机
