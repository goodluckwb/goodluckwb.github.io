//返回顶部
window.onscroll = function () {
    var totop = document.getElementById("go-to-top");
    var sc = document.documentElement.scrollTop || document.body.scrollTop;
    totop.style.display = sc > 100 ? "block" : "none";
}
function scrolltop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}
//图片分页用大图轮播
//定义方法函数
function imgSwicth() {
    var d = document.getElementById("bigimg").firstElementChild;
    var k = 0
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
$(document).ready(function () {
    //文章点击按钮展开和收缩功能
    $("article i.fas").click(function () {
        var $pp = $(this).siblings('div:last')
        if ($pp.css('display') == 'block') {
            $pp.hide(500);
            $(this).removeClass('fa-angle-double-up').addClass('fa-angle-double-down');
        } else {
            $pp.show(500);
            $(this).removeClass('fa-angle-double-down').addClass('fa-angle-double-up');
        }
    });
    //加载计算器
    $('#jisuanqi').load("./source/html/jisuanqi.html");
    //自动加载刷新股票
    function refreshPrice() {
        var x = ['1000651', '1000333', '0600690'];
        var url = 'http://api.money.126.net/data/feed/';
        for (let i = 0; i < x.length; i++) {
            url = url + x[i] + ',';
        }     
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'callbackFunction'
        }).done((data) => {
            $("#current_price").empty();
            for (let i = 0; i < x.length; i++) {
                let price = "<li>" + data[x[i]].name + " " + data[x[i]].price + " " + (data[x[i]].percent * 100).toFixed(2) + '%' + data[x[i]].arrow + "</li>"
                $("#current_price").append(price);
                $("#current_price li").css({ "display": "inline-block", "margin-right": "5px", "font-weight": "500","font-size": "12px" })
                $("#current_price li")[i].style.color = data[x[i]].percent < 0 ? "#00FF00" : "#FF0000";
            }
        }).fail((xhr, status) => {
            console.log('失败: ' + xhr.status + ', 原因: ' + status);
        });     
    };
    refreshPrice();
    setInterval(refreshPrice, 1000*60*3);
    //音乐盒
    var
        play = $('#musicplay'),
        music = $('audio')[0];
    pre = $('#musicprevious'),
        next = $('#musicnext'),
        title = $('#musictitle'),
        cover = $('#musiccover');
    var obj = {
        "sites": [
            { 'title': '只要平凡', 'name': '张杰 张碧晨', 'url': 'http://www.ytmp3.cn/down/49821.mp3' },
            { 'title': 'I Do', 'name': '911', 'url': 'http://www.ytmp3.cn/down/50636.mp3' },
            { 'title': '我好像在哪见过你', 'name': '薛之谦', 'url': 'http://www.ytmp3.cn/down/48544.mp3' },
            { 'title': 'You Say', 'name': 'Lauren Daigle', 'url': 'http://music.163.com/song/media/outer/url?id=575015416.mp3' }
        ]
    }
    var mt = obj.sites[0].title + ' / ' + obj.sites[0].name;
    title.text(mt);
    music.loop = true;
    play.click(function () {
        if (!music.paused) {
            music.pause();
            play.removeClass('pushdown').addClass('normal');
        } else {
            play.removeClass('normal').addClass('pushdown');
            music.src = obj.sites[0].url;
            music.play();
        }
    });
    pre.click(function () {
        var first = obj.sites[obj.sites.length - 1];
        obj.sites.pop();
        obj.sites.unshift(first);
        music.src = obj.sites[0].url;
        mt = obj.sites[0].title + ' / ' + obj.sites[0].name;
        play.removeClass('normal').addClass('pushdown');
        music.play();
        title.text(mt);
    })
    next.click(function () {
        var first = obj.sites[0];
        obj.sites.shift();
        obj.sites.push(first);
        music.src = obj.sites[0].url;
        mt = obj.sites[0].title + ' / ' + obj.sites[0].name;
        play.removeClass('normal').addClass('pushdown');
        music.play();
        title.text(mt);
    })
    //设置风格
    //天气预报
    var
        url = "http://wthrcdn.etouch.cn/weather_mini",
        cityid = ['101190401', '101181001', '101020100'];
    $('#select-city').change(function () {
        switch ($(this).val()) {
            case "苏州":
                citykeyv = "101190401";
                break;
            case "商丘":
                citykeyv = "101181001";
                break;
            case "上海":
                citykeyv = "101020100";
                break;
        }
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'get',
            data: {
                citykey: citykeyv
            },
            success: function (we) {
                var todaywe = we.data.forecast[0];
                var todayda = todaywe.date;
                var todayrq = todayda.substr(0, 3);
                var todayxq = todayda.substr(3, 3);
                var date = new Date();
                var month = date.getMonth() + 1;
                var lili = $('#weather ul');
                var fengli1 = todaywe.fengli.substring(9, todaywe.fengli.length - 3);
                var ganmao = we.data.ganmao;
                lili.empty();
                $("#weather span").css({ "display": 'block', "width": "40%", "float": "right", "color": "#01B1EB", 'text-align': 'right' })
                    .html(month + '月' + todayrq + " " + todayxq);
                var first = '今日:' + todaywe.high + " " + todaywe.low
                    + " " + todaywe.fengxiang + " " + fengli1 + ' ' + todaywe.type + ' ' + ganmao
                lili.append(first).css({ 'color': '#eb018a', 'font-siz': '16px' });
                var wei = we.data.forecast;
                for (let i = 1; i < wei.length; i++) {
                    var fengli = wei[i].fengli;
                    var qfl = fengli.substring(9, fengli.length - 3);
                    var forewe = "<li><span>" + wei[i].date.substr(0, 3) + " </span><span>" + wei[i].high.substr(3, 6) +
                        "</span><span> " + wei[i].low.substr(3, 6) + "</span><span> " +
                        wei[i].fengxiang + "</span><span> " + qfl + "</span><span> " + wei[i].type + "</span></li>"
                    lili.append(forewe);
                }
            }
        })
    })
    $('#select-city').change();
})