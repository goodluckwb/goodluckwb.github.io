//返回顶部
window.onscroll = function () {
    var totop = document.getElementById("go-to-top");
    var sc = document.documentElement.scrollTop || document.body.scrollTop;
    totop.style.display = sc > 240 ? "block" : "none";
}
function scrolltop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}
function randomColor(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    // var alpha=Math.random().toFixed(2);
    return `rgb(${r},${g},${b}`;
}
$(document).ready(function(){
    //更换主题
    $('#theme').change(function () {
        var random=randomColor();
        switch ($(this).val()) {
            case '喜红':
                $('#toptitle,nav,footer,footer span,#theme').css("background", "#CC0706");
                $('h2, h3,article').css('border-color', '#CC0706');
                $('h2,h3').css('color','#CC0706');
                $('.title-div').css('border-bottom-color','#cc0706')
                break;
            case '深蓝':
                $('#toptitle,nav,footer,footer span,#theme').css("background", "#0099CC");
                $('h2,h3,article').css('border-color', '#0099CC');
                $('h2,h3').css('color','#0099CC');
                $('.title-div').css('border-bottom-color','#0099cc')
                break;
            case '豆绿':
                $('#toptitle,nav,footer,footer span,#theme').css("background", "#99CC33");
                $('h2,h3').css('border-color', '#99CC33');
                $('h2,h3').css('color','#99CC33');
                $('.title-div').css('border-bottom-color','#99cc33')
                break;
            case '橙色':
                $('#toptitle,nav,footer,footer span,#theme').css("background", "#FE9800");
                $('h2,h3,article').css('border-color', '#FE9800');
                $('h2,h3').css('color','#FE9800');
                $('.title-div').css('border-bottom-color','#fe9800')
                break;
            case '夜色':
                $('#toptitle,nav,footer,footer span,#theme').css("background", "#1E1E1E");
                $('h2,h3,article').css('border-color', '#1E1E1E');
                $('h2,h3').css('color','#1E1E1E');
                $('.title-div').css('border-bottom-color','#1e1e1e')
                break;
            case '紫色':
                $('#toptitle,nav,footer,footer span,#theme').css("background", "#9966cc");
                $('h2,h3,article').css('border-color', '#9966cc');
                $('h2,h3').css('color','#9966cc');
                $('.title-div').css('border-bottom-color','#9966cc')
                break;
            case '随机':
                $('#toptitle,nav,footer,footer span,#theme').css("background", random);
                $('h2,h3,article').css('border-color', random);
                $('h2,h3').css('color',random);
                $('.title-div').css('border-bottom-color',random)
                break;
            default:
                $('#toptitle,nav,footer,footer span,#theme').css("background", "#CC0706");
                $('h2,h3,article').css('border-color', '#CC0706');
                $('h2,h3').css('color','#CC0706');
                $('.title-div').css('border-bottom-color','#cc0706')
                break;
        }
    })

     //publicmenu done.
    $("#public-menu").click(function(){
    $("#public-menu-content").slideToggle(500);
    
    })
    $("#public-menu-content").mouseleave(function(){
        $("#public-menu-content").slideUp(500);
        
    })
    $("#public-menu-content div").click(function(){
    $("#public-menu-content div ul").slideToggle(500);
    })
    $("#silder-music-show").click(function(){
        $("#silder-music-content").animate({'width':'toggle'},1000)
    })



})