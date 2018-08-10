//返回顶部
window.onscroll =function(){
var totop=document.getElementById("go-to-top");
var sc=document.documentElement.scrollTop || document.body.scrollTop;
   totop.style.display=sc>100?"block":"none";
}
function scrolltop(){
    document.body.scrollTop=document.documentElement.scrollTop=0;
}

//图片分页用大图轮播
//定义方法函数
function imgSwicth() {
    var d = document.getElementById("bigimg").firstElementChild;   
    var k=0
    var imgsrc = new Array(); 
    imgsrc[0] = "./image/01.jpg";
    imgsrc[1] = "./image/02.jpg";
    imgsrc[2] = "./image/03.jpg";
    imgsrc[3] = "./image/04.jpg";
    imgsrc[4] = "./image/05.jpg";
    setInterval(function () {
        if (k > imgsrc.length - 1) {
            k = 0;
        }
        for (var i = 0; i < imgsrc.length; i++) {
            if (i == k) {
                d.src = imgsrc[i];
            }
        }
        k++;
    }, 3000)
}

//文章点击按钮展开和收缩功能
$(document).ready(function(){
    $("article i.fas").click(function(){
        
        var $pp=$(this).siblings('div:last')
        
        if($pp.css('display')=='block'){

            $pp.hide(500);
            $(this).removeClass('fa-angle-double-up').addClass('fa-angle-double-down');            
        }else{
            $pp.show(500);
            $(this).removeClass('fa-angle-double-down').addClass('fa-angle-double-up');
            
        }
        
    })
})