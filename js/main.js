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

$(document).ready(function(){
    //文章点击按钮展开和收缩功能
    $("article i.fas").click(function(){
        
        var $pp=$(this).siblings('div:last')
        
        if($pp.css('display')=='block'){

            $pp.hide(500);
            $(this).removeClass('fa-angle-double-up').addClass('fa-angle-double-down');            
        }else{
            $pp.show(500);
            $(this).removeClass('fa-angle-double-down').addClass('fa-angle-double-up');
            
        }
        
    });
    //加载计算器
    $('#jisuanqi').load("./source/html/jisuanqi.html");

    //自动加载刷新股票
    (function refreshPrice() {
        var x=["1000651","1000333"];
        var url='http://api.money.126.net/data/feed/'+x[0]+','+x[1];
        let jqxhr = $.ajax(url, {
            method: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'callbackFunction'
        }).done((data) => {
            let str1 = data[x[0]].name + ': ' +data[x[0]].price +" "+
                (data[x[0]].updown*100/data[x[0]].price).toFixed(2)+ '%' +data[x[0]].arrow +" "
            let str2 = data[x[1]].name + ': ' +data[x[1]].price +" "+
                (data[x[1]].updown*100/data[x[1]].price).toFixed(2)+ '%'  + data[x[1]].arrow; 
                    
            $('#stock').text(str1+str2);
            
        }).fail((xhr, status) => {
            console.log('失败: ' + xhr.status + ', 原因: ' + status);
        });
        setInterval(refreshPrice,1000*60*2);
    })();

    //音乐盒
    var 
        play=$('#musicplay'),
        music=$('audio')[0];
        pre=$('#musicprevious'),
        next=$('#musicnext'),
        title=$('#musictitle'),
        cover=$('#musiccover');
        var obj={"sites":[
            {'title':'只要平凡','name':'张杰 张碧晨','url':'http://www.ytmp3.cn/down/49821.mp3'},
            {'title':'I Do','name':'911','url':'http://www.ytmp3.cn/down/50636.mp3'},
            {'title':'我好像在哪见过你','name':'薛之谦','url':'http://www.ytmp3.cn/down/48544.mp3'},
            {'title':'You Say','name':'Lauren Daigle','url':'http://music.163.com/song/media/outer/url?id=575015416.mp3'}
        ]}
        
        var mt=obj.sites[0].title+' / '+obj.sites[0].name;
        title.text(mt);
        music.loop=true;
        play.click(function(){
            if(!music.paused){
                music.pause();
                play.removeClass('pushdown').addClass('normal');
            }else{
                play.removeClass('normal').addClass('pushdown');    
                music.src=obj.sites[0].url;
                music.play();         
            }
        });

        pre.click(function(){
            var first=obj.sites[obj.sites.length-1];
            obj.sites.pop();
            obj.sites.unshift(first);         
            music.src=obj.sites[0].url;
            mt=obj.sites[0].title+' / '+obj.sites[0].name;
            play.removeClass('normal').addClass('pushdown');  
            music.play();
            title.text(mt);            
        })
        next.click(function(){
            var first=obj.sites[0];
            obj.sites.shift();
            obj.sites.push(first);         
            music.src=obj.sites[0].url;
            mt=obj.sites[0].title+' / '+obj.sites[0].name;
            play.removeClass('normal').addClass('pushdown');  
            music.play();
            title.text(mt);            
        })
    //设置风格
        

})