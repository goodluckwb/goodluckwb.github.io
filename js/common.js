
    //侧边音乐
    $("#side-music-show").click(function(){
        $("#side-music-content").animate({'width':'toggle'},1000)
    })
    //视频预览
    function VideoPreview(){
       
    }
    VideoPreview.prototype={
        init:function(){
            var that=this;
            $.ajax({
                url:'./source/video/newupload.json',
                dataType:'json',
                type:'get',
                success:function(data){
                    var htm='<div class="title-div"><h2 class="fas fa-pen-nib"> 最新发表</h2></div><ul>';
                    for(let i=0;i<data.subMenu.length;i++){
                        htm+='<li><div class="newupload-image"></div><span class="newupload-title">'+data.subMenu[i].title;
                       
                        htm+='</span><span class="badge badge-primary">'+data.subMenu[i].class+'</span></li>';
                    }
                    htm+='</ul>'
                    $('#newupload').append(htm);
                    var li=$('#newupload li');
                    var div=$('.newupload-image');
                    li.each(function(index){
                        div.eq(index).css({'background':'url('+data.subMenu[index].imgsrc+')','opacity':0.3})
                        $(li[index]).on('mouseenter',function(){
                            div.eq(index).css('opacity',1)
                        })
                        $(li[index]).on('mouseleave',function(){
                            div.eq(index).css('opacity',0.3)
                        })
                        $(li[index]).on('click',function(){
                            $('.mask').remove();
                            that.click();
                            that.play(data,index);
                            $('#newupload ul').addClass('playlist-fixed')
                           
                        })
                    })
                  
                }
            })         
        },
        click:function(){
            var heightY=($(window).height()||document.body.clientHeight)*0.8;
            var html='<div class="mask" style="display:block;position:fixed;top:10%;left:6%;width:68%;height:'+heightY+'px;background:#333;z-index:2000">'
                html+='<span class="fas fa-times fa-3x" style="position:absolute;top:0px;right:10px;color:white;cursor:pointer;z-index:2100;"></span>'
                html+='<div id="ckvideo" style="display:flex;justify-content:center;align-items:center;width:100%;height:100%;"></div></div>'
            $('body').append(html);
        },

        play:function(data,index){
                var subdata=data.subMenu[index];
                if(subdata.type=='embed'){
                    var html='<embed src='+subdata.url+' allowFullScreen="true" autoplay="true"  allowScriptAccess="always" type="application/x-shockwave-flash" />';
                    $('#ckvideo').append(html);
                }else if(subdata.type=='iframe'){
                    var html='<iframe src='+subdata.url+' frameborder="0" allowfullscreen="true" allowtransparency="true" scrolling="no" autoplay="true"></iframe>';
                    $('#ckvideo').append(html);
                }else if(subdata.type=='ckembed'){
                    var html='<embed src="./js/ckplayer.swf" flashvars="autoplay=1&video='+subdata.url+'" allowScriptAccess="always" allowFullscreen="true" autoplay="true" type="application/x-shockwave-flash" />';
                    $('#ckvideo').append(html);
                }else if(subdata.type=='ckplayer'){
                    var videoObject = {
                        container: '#ckvideo',//“#”代表容器的ID，“.”或“”代表容器的class
                        variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
                        autoplay:true,
                        video:subdata.url//视频地址
                    };
                    var player=new ckplayer(videoObject);
                }else if(subdata.type=='h5video'){
                    var html='<video src='+subdata.url+' controls autoplay></video>';
                    $('#ckvideo').append(html);
                }
                $(".fa-times").mouseover(function(){
                   $(this).css('color','red')
                   
                })
                $(".fa-times").mouseleave(function(){
                   $(this).css('color','white')
                   
                })
                $(".fa-times").click(function(){
                    $('.mask').remove();
                    $('#newupload ul').removeClass('playlist-fixed')
                })
            }
    }


    var V=new VideoPreview();
    V.init();


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
