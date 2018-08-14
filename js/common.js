//返回顶部
window.onscroll = function () {
    var totop = document.getElementById("go-to-top");
    var sc = document.documentElement.scrollTop || document.body.scrollTop;
    totop.style.display = sc > 100 ? "block" : "none";
}
function scrolltop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}
$(document).ready(function(){
    //更换主题
    $('#theme').change(function () {
        switch ($(this).val()) {
            case '喜红':
                $('h2,#toptitle,nav,footer,footer span').css("background", "#CC0706");
                $('#theme').css('background', '#CC0706');
                break;
            case '深蓝':
                $('h2,#toptitle,nav,footer,footer span').css("background", "#0099CC");
                $('#theme').css('background', '#0099CC');
                break;
            case '豆绿':
                $('h2,#toptitle,nav,footer,footer span').css("background", "#99CC33");
                $('#theme').css('background', '#99CC33');
                break;
            case '橙色':
                $('h2,#toptitle,nav,footer,footer span').css("background", "#FE9800");
                $('#theme').css('background', '#FE9800');
                break;
            case '夜色':
                $('h2,#toptitle,nav,footer,footer span').css("background", "#1E1E1E");
                $('#theme').css('background', '#1E1E1E');
                break;
            case '紫色':
                $('h2,#toptitle,nav,footer,footer span').css("background", "#9966cc");
                $('#theme').css('background', '#9966cc');
                break;
            default:
                $('h2,#toptitle,nav,footer,footer span').css("background", "#CC0706");
                $('#theme').css('background', '#CC0706');
                break;
        }
    })

})