//主页图片轮播
var ul=document.getElementById('imgturn');
var previous=document.getElementById("previous");
var next=document.getElementById("next");
var imgicon=document.getElementById("imgicon");
var scroll=document.getElementById('lsidetop');
var liwidth=ul.children[0].offsetWidth;

var linum=ul.childElementCount;

//封装animate()动画函数
function animate(obj, target) {
    clearInterval(obj.timer);
    var speed = obj.offsetLeft < target ? 15 : -15;
    obj.timer = setInterval(function () {
        var result = target - obj.offsetLeft;
        obj.style.left = obj.offsetLeft + speed + 'px';
        if (Math.abs(result) <= Math.abs(speed)) {
            clearInterval(obj.timer)
            obj.style.left = target + 'px'
        }
    }, 10);
}
//定时器函数
var timer = null;
var key = 0;
var oll = imgicon.children;

function autoplay() {
    /*自动轮播时,要对播放的张数key进行一个判断,如果播放的张数
    就要重头开始播放.  因为我们克隆了第一张并将其放在最后面,所以我们要从第二张图片开始播放*/
    key++;
    if (key > linum - 1) {
        ul.style.left = 0;
        key = 1;
    }
    animate(ul, -key * liwidth);
    //设置小圆点的激活状态
    showci(key-1);
}
//显示小圆点函数封装
function showci(ci) {
    ci++;
    for (var i = 0; i < oll.length; i++) {
        if (ci > oll.length - 1) { ci = 0 } else {
            oll[i].className = '';
        }
        oll[ci].className = 'current';
    }
}
//设置自动播放
timer = setInterval(autoplay, 5000);
//设置鼠标进入自动播放停止
scroll.onmouseenter = function () {
    clearInterval(timer)
}
scroll.onmouseleave = function () {
    timer = setInterval(autoplay, 5000);
}
//设置点击小圆点切换到相应的图片,闭包
for (var i = 0, len = oll.length; i < len; i++) {
    (function (i) {
        oll[i].onclick = function () {
            ci = i - 1;
            key = i;
            animate(ul, -key * liwidth);
            showci(ci);
        }
    }
    )(i);
}
//设置左右点击
(function () {
previous.onclick = function () {
    if (key < 1) {
        key = 4;
        ul.style.left = -key*liwidth;
    }
    key--;
    animate(ul, -key * liwidth);
    
    showci(key - 1);
}
next.onclick = function () {
    if (key > linum - 2) {
        ul.style.left = 0;
        key = 0;
    }
    key++;
    animate(ul, -key * liwidth);
    showci(key - 1);
}
})();