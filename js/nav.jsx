const element_nav=(
    <div>
        <section id="public-menu-content">
            <div style={{background: '#ffffff'}} id="public-menu-content-div1">
                <p>菜单</p>
                <ul>
                    <li>这是内容一部分</li>
                    <li>这是内容一部分</li>
                </ul>
            </div>
            <div style={{background: '#ffffff'}} id="public-menu-content-div2">
                <p>菜单</p>
                <ul>
                    <li> <a href="./index.html" > 首页</a></li>
                    <li><a href="./article.html"> 文章</a></li>
                    <li><a href="./video.html"> 视频</a></li>
                    <li><a href="./image.html"> 图像</a></li>
                    <li><a href="./video-live.html"> 电视</a></li>
                    <li><a href="./timeline.html"> 时间线</a></li>
                </ul>
            </div>
            <p>点击菜单外区域将关闭</p>
        </section>
        <div id="coolsites-list">

        </div>
        <nav>
            <div id="logo">
                <span id="public-menu"></span>
                <a href="./index.html"> <img src="./image/wblogo2.svg" alt="logo" width="100" /></a>
                <a href="#">goodluckwb</a>
            </div>
            <ul id="mainmenu">
                <li> <a href="./index.html">首页</a> <span></span><i></i></li>
                <li><a href="./article.html"> 文章</a><span></span><i></i></li>
                <li><a href="./video.html"> 视频</a><span></span><i></i></li>
                <li><a href="./image.html"> 图像</a><span></span><i></i></li>
                <li><a href="./video-live.html"> 电视</a><span></span><i></i></li>
                <li><a href="./timeline.html"> 时间线</a><span></span></li>
            </ul>
            <div id="smallpart">
                <div id="search">
                    <form action="https://www.baidu.com/baidu" method="GET" target="_blank">
                        <input className="search-input" type="text" name="word" placeholder="请输入关键字" />
                        <input className="search-submit" type="submit" value="百度" />
                    </form>
                </div>
                <div id="jisuanqi">
                </div>
                <ul>
                    <li id="coolsites">酷站</li>
                    <li id="click-jsq">计算器</li>
                    <li id="theme">
                        <p id="theme-select" value="">主题</p>
                        <span className="fas fa-angle-down"></span>
                        <ol>
                            <li>喜红</li>
                            <li>深蓝</li>
                            <li>豆绿</li>
                            <li>橙色</li>
                            <li>夜色</li>
                            <li>紫色</li>
                            <li>随机</li>
                        </ol>
                    </li>
                </ul>
            </div>
        </nav>
        <header>
        <img src="./image/headerl.png" alt="" />
        <h1>心随你的步调</h1>
        <h3><i>一个平凡人的自语</i></h3>
        </header>
        <div id="go-to-top" style={{display: 'none'}}>
        <div className="gototop">
            <i className=""></i>
        </div>
        <div className="gototop">
            <i className=""></i>
        </div>
        <div className="gototop">
            <i className=""></i>
        </div>
        <div className="gototop">
            <i id="gototop-up" onClick={Scrolltop}></i>
            <span className='totoptip'>返回顶部</span>

        </div>
    </div> 
    </div>   
);
ReactDOM.render(
    element_nav,
    document.getElementById('nav')
);
const element_footer=(
    <div className="wrapper">
        <div className="footer_top">
            <h4>
                <span>WeiBin</span>
            </h4>
        </div>
        <div className="footer_bottom">
            <span>
                &copy;版权所有, 2018-2020 All Rights Reserved.
            </span>
            <div className="footer_line"></div>
        </div>
    </div>
);
ReactDOM.render(
    element_footer,
    document.getElementById('footer')
);

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
function Scrolltop() {
    // document.body.scrollTop = document.documentElement.scrollTop = 0;
    $('html,body').animate({scrollTop:0},500);
    return false;
}
//随机颜色
    function randomColor(){
        var r=Math.floor(Math.random()*256);
        var g=Math.floor(Math.random()*256);
        var b=Math.floor(Math.random()*256);
        // var alpha=Math.random().toFixed(2);
        return `rgb(${r},${g},${b}`;
    }
    //检测cookie
    var style=cookie.get('style');
    $('#theme-select').html(style).attr('value',style);
    changeTheme($('#theme-select'));
	
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
        var theme=$('#theme-select').text();
        cookie.set('style',theme,30);
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

