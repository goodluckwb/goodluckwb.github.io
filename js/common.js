$(document).ready(function(){
    //侧边音乐
    $("#side-music-show").click(function(){
        $("#side-music-content").animate({'width':'toggle'},1000)
    })

    
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
