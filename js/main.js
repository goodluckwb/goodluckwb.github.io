//定义$()方法来快速的选取id和class
function $(x){
    return  document.querySelector(x);
}
window.onscroll =function(){
var totop=document.getElementById("go-to-top");
var sc=document.documentElement.scrollTop || document.body.scrollTop;
   totop.style.display=sc>100?"block":"none";
}
function scrolltop(){
    document.body.scrollTop=document.documentElement.scrollTop=0;
}
// 直播切换频道
function changechannel(test){   
    var channel=document.getElementsByClassName("channeltab");
    var iframe=document.getElementById("player");
        if (test=="channel[0]"){
            iframe.src="http://player.cntv.cn/standard/live_HLSDRM20180618.swf?ChannelID=cctv5&amp;videoTVChannel=cctv5&amp;P2PChannelID=pd://cctv_p2p_hdcctv5&amp;VideoName=cctv5&amp;channelID=cctv5&amp;BannerWidth=600&amp;BannerInterval=20&amp;playBackType=common&amp;ruleVisible=true&amp;languageXml=&amp;configURL=http://player.cntv.cn/flashplayer/config/WebHDSPlayerConfig.xml&amp;referrer=&amp;fingerprint=Fingerprint&amp;wmode=opaque&amp;quality=high";            
        }else if (test=="channel[1]"){
            iframe.src="http://liveshare.huya.com/11352944/huyacoop.swf";
        }else if (test=="channel[2]"){
            iframe.src="http://liveshare.huya.com/11342384/huyacoop.swf";
        }
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