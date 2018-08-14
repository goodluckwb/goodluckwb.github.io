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
    //计算器消隐与出现       
    $('#click-jsq').click(function(){
        $('#jisuanqi').slideToggle(500);
    })
    //自动加载刷新股票
    function refreshPrice() {
        var x = ['1000651', '1000333', '0600690'];
        var url = 'https://api.money.126.net/data/feed/';
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
        cover = $('#musiccover'),
        wyurl="https://music.163.com/song/media/outer/url?id=";
    var obj = {
        "sites": [
            { 'title': '只要平凡', 'name': '张杰 张碧晨', 'url': wyurl+'574919767' },
            { 'title': 'I Do', 'name': '911', 'url': wyurl+'28256115' },
            { 'title': '我好像在哪见过你', 'name': '薛之谦', 'url': wyurl+'417859631' },
            { 'title': 'You Say', 'name': 'Lauren Daigle', 'url': wyurl+'575015416' },
            { 'title': '致青春', 'name': '王菲', 'url': wyurl+'27588992' },
            { 'title': '半壶纱', 'name': '刘珂矣', 'url': wyurl+'28793140' }
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
    
    
    $('#select-city').change(function () {
        switch ($(this).val()) {
            case "苏州":
                citykey = "320500";
                break;
            case "商丘":
                citykey = "411400";
                break;
            case "上海":
                citykey = "310000";
                break;
        }
        tianQi(citykey);
    })
    
    function tianQi(location,type,el){
        var   url = "https://restapi.amap.com/v3/weather/weatherInfo";
        $.ajax({
            url: url,
            dataType: 'jsonp',
            type: type,
            data: {
                key: "dfb9a576fbcb2c9a13a65ab736e47004",
                city: location,
                extensions: "all"
            },
            jsonp:'callback',
            success: function (we) {
                var todaywe = we.forecasts[0].casts[0];
                var date = new Date();
                var month = date.getMonth() + 1;
                var todayrq = date.getDate();
                var todayxq = date.getDay();
                var lili = $('#weather ul');
                var fengli1 = todaywe.daypower;
                lili.empty();
                $("#weather i").html(month + '月' + todayrq + " 星期" + todayxq +" "+we.forecasts[0].city);
                var first = '<li>今日:高' + todaywe.daytemp + "°C 低" + todaywe.nighttemp
                    + "°C " + todaywe.daywind + "风 " + fengli1 + '级 ' + todaywe.dayweather+'</li>';
                lili.append(first);
                var wei = we.forecasts[0].casts;
                for (let i = 1; i < wei.length; i++) {
                    var forewe = "<li><span>" + wei[i].date.substr(6,10) + " </span><span>高" + wei[i].daytemp +
                        "°C </span><span>低 " + wei[i].nighttemp+ "°C </span><span>" +
                        wei[i].daywind + "风</span><span>" + wei[i].daypower + "级</span><span> " + wei[i].dayweather + "</span></li>"
                    lili.append(forewe);
                }
            }
        })
    }
   tianQi('苏州','post','.box1');
   $("#input-city").change(function(){
       tianQi($(this).val(),'post','.box1');
   })

   //publicmenu done.
   $("#public-menu").click(function(){
       $("#public-menu-content").slideToggle(500);
       
   })
   $("#public-menu-content").mouseleave(function(){
        $("#public-menu-content").slideUp(500);
       
   })
   $("#public-menu-content div").click(function(){
    $("#public-menu-content div ul").slideToggle(500);
   })
   $("#silder-music-show").click(function(){
       $("#silder-music-content").animate({'width':'toggle'},1000)
   })
   
   

})