//imgshow
// var d=document.getElementById('leftshow');
// var img=d.getElementsByTagName('img');
// var num=0;
// var len=img.length;
// function show(test){
//     if (test=="img[0]"){
//         img[0].style.display='block';
//         img[1].style.display='none';
//         img[2].style.display='none';

//     }else if (test=="img[1]"){
//         img[0].style.display='none';
//         img[1].style.display='block';
//         img[2].style.display='none';
//     }else if (test=="img[2]"){
//         img[0].style.display='none';
//         img[1].style.display='none';
//         img[2].style.display='block';
//     }
// }
// setTimeout('show()',3000);
// 返回顶部按钮
function scrolltop(){
    document.body.scrollTop=document.documentElement.scrollTop=0;
}
// 直播切换频道
var channel=document.getElementsByClassName("channeltab");
var iframe=document.getElementById("player");

function changechannel(test){   
        if (test=="channel[0]"){
            iframe.src="http://liveshare.huya.com/11352944/huyacoop.swf";
        }else if (test=="channel[1]"){
            iframe.src="http://liveshare.huya.com/11342384/huyacoop.swf";
        }else if (test=="channel[2]"){
            iframe.src="http://player.cntv.cn/standard/live_HLSDRM20180618.swf?ChannelID=cctv5&amp;videoTVChannel=cctv5&amp;P2PChannelID=pd://cctv_p2p_hdcctv5&amp;VideoName=cctv5&amp;channelID=cctv5&amp;BannerWidth=600&amp;BannerInterval=20&amp;playBackType=common&amp;ruleVisible=true&amp;languageXml=&amp;configURL=http://player.cntv.cn/flashplayer/config/WebHDSPlayerConfig.xml&amp;referrer=&amp;fingerprint=Fingerprint&amp;wmode=opaque&amp;quality=high";
        }
}