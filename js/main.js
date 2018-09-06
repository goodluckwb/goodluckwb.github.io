$(document).ready(function () {
    //加载热点模块
    $('#focus-content').load('./source/html/focus.html');
    //自动加载刷新股票
    function refreshPrice() {
        var x = ['1000651', '1000333', '0600690','0600887','0600519','0600030','1150153'];
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
                let price = '<li><span class="badge badge-index'+' index-'+i+'">'+(i+1)+'</span> ' + data[x[i]].name + " " + data[x[i]].price + " " + (data[x[i]].percent * 100).toFixed(2) + '%' + data[x[i]].arrow + "</li>"
                $("#current_price").append(price);
    
                $("#current_price li")[i].style.color = data[x[i]].percent < 0 ? "#99cc33" : "#CC0706";
            }
        }).fail((xhr, status) => {
            console.log('失败: ' + xhr.status + ', 原因: ' + status);
        });     
    };
    refreshPrice();
    setInterval(refreshPrice, 1000*60*1);
    //音乐盒
    var
        play = $('#musicplay'),
        music = $('audio')[0],
        pre = $('#musicprevious'),
        next = $('#musicnext'),
        title = $('#musictitle'),
        cover = $('#musiccover img'),
        wyurl="https://music.163.com/song/media/outer/url?id=";
    var obj = {
        "sites": [
            { 'title': '只要平凡', 'name': '张杰 张碧晨', 'url': wyurl+'574919767','coverurl':'https://p1.music.126.net/CjGoliP3xOB0gcCUaeTTBg==/109951163375727336.jpg?param=300x300' },
            { 'title': 'I Do', 'name': '911', 'url': wyurl+'28256115','coverurl':'https://p1.music.126.net/ZNnDcq2-b_An3_ag3H5XhQ==/5980243743520718.jpg?param=300x300' },
            { 'title': '我好像在哪见过你', 'name': '薛之谦', 'url': wyurl+'417859631','coverurl':'https://p1.music.126.net/hti_a0LADoFMBHvOBwAtRA==/1369991500930171.jpg?param=300x300' },
            { 'title': 'You Say', 'name': 'Lauren Daigle', 'url': wyurl+'575015416' ,'coverurl':'https://p1.music.126.net/VWpkL_6bE5J44Cqe37RlCA==/109951163405345754.jpg?param=300x300'},
            { 'title': '致青春', 'name': '王菲', 'url': wyurl+'27588992','coverurl':'https://p1.music.126.net/NGup83j86vv_IUsxJC7hDg==/5654788301727269.jpg?param=300x300' },
            { 'title': '暗涌', 'name': '王菲', 'url': wyurl+'300136','coverurl':'https://p1.music.126.net/w8RFsMH8VJfPsBmVudYGsA==/109951163020569833.jpg?param=300x300' },
            { 'title': 'Faraway', 'name': 'Gala', 'url': wyurl+'18059932','coverurl':'https://p1.music.126.net/ebiFHjGorTpqEihTNM2G3Q==/3231464674043130.jpg?param=200x200' },
			{ 'title': 'Beautiful now', 'name': 'Zedd', 'url': wyurl+'32019002','coverurl':'http://p1.music.126.net/ze_ggtReuHBLF2o-wUolFw==/109951163221161145.jpg?param=300x300' },
            { 'title': '半壶纱', 'name': '刘珂矣', 'url': wyurl+'28793140' ,'coverurl':'https://p1.music.126.net/SKujq5vqqv4KYOVFk7SiRA==/3407386538630284.jpg?param=300x300'}
        ]
    };
    var mt = obj.sites[0].title + ' / ' + obj.sites[0].name;
    title.text(mt);
    // music.loop = true;
    play.click(function () {
        if (!music.paused) {
            music.pause();
            imagePause();
            play.removeClass('pushdown').addClass('normal');
        } else {
            play.removeClass('normal').addClass('pushdown');
            music.src = obj.sites[0].url;
            changeCover(0);
            music.play();
            rotate();
        }
    });
    pre.click(function () {
        imagePause();
        var first = obj.sites[obj.sites.length - 1];
        obj.sites.pop();
        obj.sites.unshift(first);
        music.src = obj.sites[0].url;
        mt = obj.sites[0].title + ' / ' + obj.sites[0].name;
        play.removeClass('normal').addClass('pushdown');
        music.play();
        changeCover(0);
        title.text(mt);
        rotate();
    })
    next.click(function () {
        imagePause();
        var first = obj.sites[0];
        obj.sites.shift();
        obj.sites.push(first);
        music.src = obj.sites[0].url;
        mt = obj.sites[0].title + ' / ' + obj.sites[0].name;
        play.removeClass('normal').addClass('pushdown');
        music.play();
        title.text(mt);
       
        changeCover(0);
        rotate();
    })
    //进度条
    //播放列表
    var list=$('#bofanglist ul');
    var len=obj.sites.length;
    var ss=obj.sites;
    var timer1;
    $('#jindutiao span').click(function(){
    refreshplaylist();
    list.slideToggle(500); 
        //闭包输出点击播放列表的歌曲
        function sequnce(arrLi){
            for(var i = 0; i < arrLi.length; i++){
                (function(j){
                    arrLi[j].onclick = function(){
                        
                       imagePause();
                        music.src=obj.sites[j].url;
                        mt = obj.sites[j].title + ' / ' + obj.sites[j].name;
                        play.removeClass('normal').addClass('pushdown');
                        music.play();
                        changeCover(j);
                        
                        title.text(mt);
                        rotate();
                      
                    }	
                }(i))
            }
           
        }
        var lii=$('#bofanglist li')
        sequnce(lii);
       
    })
    //播放列表刷新
    function refreshplaylist(){
        list.empty();
        for(let i=0;i<len;i++){
            var li='<li> '+ 0+(i+1) +' '+ss[i].title+" "+ss[i].name+'</li>';
            list.append(li);
        }}
       
     //图片旋转，每30毫米旋转5度 和进度条
     function rotate(){
        
        var deg=0;
        
        timer1=setInterval(function(){
            var jdt=$('#jindutiao-current')[0];
            var jdttxt=$('#jindutiao-current h5')[0];
            //获取当前歌曲的歌长
            var lenth=music.duration;
            cur=music.currentTime;
            jdt.style.width=""+parseInt(cur*100/lenth)+"%";
            minute=parseInt(cur/60);
            second=parseInt(cur%60);
            if(cur%60<10){
                jdttxt.innerHTML=""+minute+":0"+second+"";
            }else{
                jdttxt.innerHTML=""+minute+":"+second+"";
            }           
            
                      
            cover[0].style.transform="rotate("+deg+"deg)";
            deg+=1;
            if(deg>360){
                deg=0;
            }
        },30);
      
    }
    //图片暂停旋转
    function imagePause(){
        clearInterval(timer1);
    }
    //顺序播放
    setInterval(function(){
        if(music.ended){
            next.click();
        }
    },1000)
    //换封面
    function changeCover(x){
        // cover[0].src="";
        cover[0].src=obj.sites[x].coverurl;
    }
    //设置风格
    
    //canvas 作图标
    function playicon(){
        var cc=$('#myCanvas')[0];
        var ctx=cc.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(20,12);
            ctx.lineTo(40,25);
            ctx.lineTo(20,38);
            ctx.closePath();
            ctx.lineWidth=5;
            ctx.linJion='round';
            ctx.strokeStyle='white';
            ctx.stroke();
        

    }

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
                $("#weather h4").html(' '+month + '月' + todayrq + " 星期" + todayxq +" "+we.forecasts[0].city);
                var first = '<li>今日:高' + todaywe.daytemp + "°C 低" + todaywe.nighttemp
                    + "°C " + todaywe.daywind + "风" + fengli1 + '级 ' + todaywe.dayweather+'</li>';
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

  //热点选项卡切换
  function Sw(id1,id2){
    this.tab=$(id1).find('li');
    this.div=$(id2).find('div');
    this.index=0;
    
  }
  Sw.prototype.Switch=function(){
     for(var i=0;i<this.tab.length;i++){
          var that=this;
          this.tab[i].index=i;
          $(this.tab[i]).on('click',function(){
            that.Tab(this);
        })
      }
  }
  Sw.prototype.Tab=function(obj){
    for(let i=0;i<this.tab.length;i++){
        $(this.tab[i]).removeClass();
        $(this.div[i]).slideUp(500);
    }
    $(this.tab[obj.index]).addClass('active');
   $(this.div[obj.index]).slideDown(500);
  }
//   function Sw(id1,id2){
//     this.diva=document.getElementById(id1);
//     this.tab=this.diva.getElementsByTagName('li');
//     this.divb=document.getElementById(id2);
//     this.div=this.divb.getElementsByTagName('div');
//     this.index=0;
//   }
//   Sw.prototype.Switch=function(){
//       for(let i=0;i<this.tab.length;i++){
//           var that=this;
//           this.tab[i].index=i;
//           this.tab[i].onmouseover=function(){
//             that.Tab(this);
//           }
//       }
//   }
//   Sw.prototype.Tab=function(obj){
//     for(let i=0;i<this.tab.length;i++){
//         this.tab[i].className='';
//         this.div[i].style.display='none';
//     }
//     this.tab[obj.index].className='active';
//     this.div[obj.index].style.display='block';
//   }
  Sw.prototype.autoplay=function(){
        var that=this;
        setInterval(function(){
            if(that.index==that.tab.length-1){
                that.index=0;
            }else{
                that.index++;
            }
        that.Tab(that);
        },3000);    
    }
  window.onload=function(){
      var tab1=new Sw($('#focus-list'),$('#focus-content'));
      tab1.Switch();
  }


})