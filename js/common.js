$(document).ready(function(){
    
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

//设置cookies
var cookie={
    set:function(key,val,time){
        var date=new Date();
        var expiresDays=time;
        date.setTime(date.getTime()+expiresDays*24*3600*1000);
        document.cookie=key+'='+val+';expires='+date.toGMTString();
    },
    get:function(key){
        var getCookie=document.cookie.replace(/[ ]/g,'');
        var arrCookie=getCookie.split(';')
        var tips;
        for(let i=0;i<arrCookie.length;i++){
            var arr=arrCookie[i].split('=');
            if(key==arr[0]){
                tips=arr[1];
                break;
                
            }  
             
        }
        return tips; 
    },
    delete:function(key){
        var date=new Date();
        date.setTime(date.getTime()-10000);
        document.cookie=key+'=v;expires='+date.toGMTString();
    }
}
