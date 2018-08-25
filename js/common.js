//返回顶部
window.onscroll = function () {
    var totop = document.getElementById("go-to-top");
    var sc = document.documentElement.scrollTop || document.body.scrollTop;
    // totop.style.display = sc > 240 ? "block" : "none";
    if(sc>240){
        $(totop).fadeIn(500);
		
    }else{
        $(totop).fadeOut(500);
    }
}
function scrolltop() {
    // document.body.scrollTop = document.documentElement.scrollTop = 0;
    $('html,body').animate({scrollTop:0},500);
    return false;
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
    $('#theme span').click(function(){
        $('#theme ol').slideToggle(300);
    })
    $('#theme-select').click(function(){
        $('#theme ol').slideToggle(300);
    })
    $('#theme ol li').click(function(){
        var txt=$(this).text();
        $('#theme-select').html(txt).attr('value',txt);        
        changeTheme($(this));
        $('#theme ol').hide(300);
    })
   function changeTheme(obj){
        var random=randomColor();
        switch ($(obj).text()) {
            case '喜红':
                $('#toptitle,nav,footer,footer span,#theme ol').css("background", "#CC0706");
                $('h2, h3,article,#coolsites-list').css('border-color', '#CC0706');
                $('h2,h3').css('color','#CC0706');
                $('.title-div').css('border-bottom-color','#cc0706');
                $('body,#coolsites-list').css('background','#FAE8E8')
                break;
            case '深蓝':
                $('#toptitle,nav,footer,footer span,#theme ol').css("background", "#079FE3");
                $('h2,h3,article,#coolsites-list').css('border-color', '#079FE3');
                $('h2,h3').css('color','#079FE3');
                $('.title-div').css('border-bottom-color','#079FE3')
                $('body,#coolsites-list').css('background','linear-gradient(to right,#f9f9f9,#E8F6FC)');
                break;
            case '豆绿':
                $('#toptitle,nav,footer,footer span,#theme ol').css("background", "#99CC33");
                $('h2,h3,article,#coolsites-list').css('border-color', '#99CC33');
                $('h2,h3').css('color','#99CC33');
                $('.title-div').css('border-bottom-color','#99cc33')
                $('body,#coolsites-list').css('background','linear-gradient(to right,#f9f9f9,#F3F9E8)')
                break;
            case '橙色':
                $('#toptitle,nav,footer,footer span,#theme ol').css("background", "#FE9800");
                $('h2,h3,article,#coolsites-list').css('border-color', '#FE9800');
                $('h2,h3').css('color','#FE9800');
                $('.title-div').css('border-bottom-color','#fe9800')
                $('body,#coolsites-list').css('background','linear-gradient(to right,#f9f9f9,#FFF3E2)')
                break;
            case '夜色':
                $('#toptitle,nav,footer,footer span,#theme ol').css("background", "#1E1E1E");
                $('h2,h3,article,#coolsites-list').css('border-color', '#1E1E1E');
                $('h2,h3').css('color','#1E1E1E');
                $('.title-div').css('border-bottom-color','#1e1e1e')
                $('body,#coolsites-list').css('background','linear-gradient(to right,#f9f9f9,#E6E6E6)')
                break;
            case '紫色':
                $('#toptitle,nav,footer,footer span,#theme ol').css("background", "#9966cc");
                $('h2,h3,article,#coolsites-list').css('border-color', '#9966cc');
                $('h2,h3').css('color','#9966cc');
                $('.title-div').css('border-bottom-color','#9966cc')
                $('body,#coolsites-list').css('background','linear-gradient(to right,#f9f9f9,#F0E8F7)')
                break;
            case '随机':
                $('#toptitle,nav,footer,footer span,#theme ol').css("background", random);
                $('h2,h3,article,#coolsites-list').css('border-color', random);
                $('h2,h3').css('color',random);
                $('.title-div').css('border-bottom-color',random)
                break;
            default:
                $('#toptitle,nav,footer,footer span,#theme ol').css("background", "#CC0706");
                $('h2,h3,article,#coolsites-list').css('border-color', '#CC0706');
                $('h2,h3').css('color','#CC0706');
                $('.title-div').css('border-bottom-color','#cc0706')
                $('body,#coolsites-list').css('background','linear-gradient(to right,#f9f9f9,#FAE8E8)')
                break;
        }
    }

     //publicmenu done.
    $("#public-menu").click(function(e){
		e.stopPropagation();
		$("#public-menu-content").slideToggle(500);
		if($("#public-menu-content").is(":visible")){
		   $(document).one("click",function(){
			$("#public-menu-content").slideUp(500);
		   });
		}
	});
	$("#public-menu-content").on("click",function(e){
		e.stopPropagation();
	})
	
	
    $("#public-menu-content-div1>p").click(function(){
    $("#public-menu-content-div1>ul").slideToggle(500);
    })
	$("#public-menu-content-div2>p").click(function(){
    $("#public-menu-content-div2>ul").slideToggle(500);
    })
    //侧边音乐
    $("#side-music-show").click(function(){
        $("#side-music-content").animate({'width':'toggle'},1000)
    })

    //coolsites-list
    $('#coolsites').click(function(){
        $('#coolsites-list').slideToggle(500);
    })
    $('#coolsites-list').mouseleave(function(){
        $('#coolsites-list').slideUp(500);
    })
    //加载酷站
    $('#coolsites-list').load('./source/html/coolsites.html');
})