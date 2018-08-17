function wbplayer(){
   
}
wbplayer.prototype={
    init:function($ct){
            this.$volume = this.$ct.find('.volume'),
			this.$volumeCt = this.$ct.find('.fm-volume'),
			this.$volBg = $volBg = this.$ct.find('.fm-volume-bg'),
			this.$play = $('.play'),
			this.audio = document.getElementById('audio'),
			this.$volVal = $('.fm-volume-value'),
			this.$volBar = $('.fm-volume-bar'),
			this.$bgImg = this.$ct.find('.fm-bg'),
			this.$title = this.$ct.find('.fm-title'),
			this.$author = this.$ct.find('.fm-author'),
			this.$next = this.$ct.find('.next'),
			// this.pre = this.ct.find('.pre'),
			this.$loop = this.$ct.find('.loop'),
			this.$lyricBtn = this.$ct.find('.showLyric'),
			this.$menuBtn = this.$ct.find('.fm-menu'),
			this.$fmOrder = this.$ct.find('.style-order'),
			this.$down = this.$ct.find('.down'),
			this.$like = this.$ct.find('.xiai'),
			this.$lyric = $lyric= this.$ct.find('.lyric'),
			this.$lyricLi = $lyricLi = this.$lyric.find('.active'),
			this.$lyricTop = $lyricTop = parseInt($lyric.css('top')),
			this.$progressBar = $progressBar = this.$ct.find('.fm-progress-bar'),
			this.$progressVal = $progressVal = this.$ct.find('.fm-progress-value'),
			this.$model = this.$ct.find('.model'),
			this.$totalTime = $totalTime =  this.$ct.find('.total-time'),
			this.$playTime = $playTime = this.$ct.find('.cur-time'),
			this.$icon = $icon = this.$ct.find('.icon'),
			this.$warp = $warp = this.$ct.find('.fm-warp'),
 			this.downUrl = '',
			this.channelId =  '',
            this.timer,
            this.src='https://music.163.com/song/media/outer/url?id=417859631',
			this.html = 
	
			'<audio id="audio" autoplay src="">'+
				'<source src="" type="audio/mpeg">'+
				'您的浏览器不支持 audio 元素。'+
			'</audio>'

			this.curVol = 0.8 * 100,
			this.audio.volume = 0.8,
			this.sid = -1;

			
			this.$volVal.height(100 - this.curVol + '%');

			this.randomSong();
			this.bind();
			this.getChannels();
			this.$volBg.hide();
			this.drag();

			
			setInterval(this.playProgress, 500);

		
    },
    getSong: function(){
        var self = this;
         $.ajax({
              url: 'http://api.jirengu.com/fm/getSong.php',
              type: 'get',
              dataType: 'json',
              data: {
                  channel: this.channelId
              },
              timeout: 2500,
          }).done(function(res){
                  if (!res.song[0].url && typeof(res.song[0].url)!="undefined" && res.song[0].url!=0){
                    self.getSong();
                }
                  self.$bgImg.css('background-image', 'url(' + res.song[0].picture + ')');
                  $(audio).attr('src', res.song[0].url);
                  self.$title.text(res.song[0].title).attr('title', res.song[0].title);
                  self.$author.text(res.song[0].artist);
                  self.downUrl = res.song[0].url;
                  self.sid = res.song[0].sid;
                  self.getLyric();
              });
    },
    randomSong: function(){
        this.channelId = 'public_aaa_bbb';
        this.getSong();
    },
    //TODO:
    getLyric: function(){
        var self = this;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getLyric.php',
            type: 'post',
            dataType: 'json',
            data: {
                sid: this.sid
            }
        }).done(function(lyric){
            var lyricArr = lyric.lyric.split('\n'),
                lyricTime = [],
                lyricText = [],
                lyricInitArr = [],
                numArr = [],
                lyricTimeNum = 0,
                timeReg = /\[\d{2}:\d{2}.\d{2}\]/g;
            for (var i = 0; i < lyricArr.length; i++) {
                lyricText.push(lyricArr[i].replace(timeReg, ''));
                if (!(!lyricArr[i].match(timeReg) && typeof(lyricArr[i].match(timeReg))!="undefined" && lyricArr[i].match(timeReg)!=0)) {
                    lyricTime.push(lyricArr[i].match(timeReg));
                } else {
                    lyricArr.splice(i, 1);
                    i--;
                }
                numArr.push(lyricTime[i][0].slice(1, -1).split(':'));
                lyricTimeNum = parseInt(numArr[i][0] * 60) + parseFloat(numArr[i][1]);
                if (lyricTimeNum === 0.01) {
                    continue;
                }
                var obj = { val: 0, text: ''};
                obj.val = lyricTimeNum;
                obj.text = lyricText[i];
                lyricInitArr.push(obj);
            }
            self.renderLyric(lyricInitArr);
        });
    },
    renderLyric: function(lyricArr){
        this.$lyric.find('li').empty();
        var html = '';
        for (var i = 0; i < lyricArr.length; i++) {
            html += '<li data-time="' + lyricArr[i].val + '">' + lyricArr[i].text + '</li>';
        }
        this.$lyric.append(html);
        this.$lyricLis = $lyricLis = $('.lyric > li');
        setInterval(this.showLyric, 100);
    },
    showLyric: function(){
        var liH = $lyricLi.outerHeight();
        var num = $lyricTop/liH
        for (var i = 0; i < $lyricLis.length; i++) {
            var curT = $lyricLis.eq(i).attr('data-time');
            var nexT = $lyricLis.eq(i+1).attr('data-time');
            var curTime = this.audio.currentTime;
            if ((curTime >= curT) && (curT < nexT)) {
                $lyricLis.removeClass('active');
                $lyricLis.eq(i).addClass('active');
                $lyric.css('top', -liH * (i-num) + 'px');
            }
        }
    },
    getChannels: function(){
        var self = this;
        $.ajax({
            url: 'http://api.jirengu.com/fm/getChannels.php',
            type: 'get',
            dataType: 'json'
        }).done(function(res){
            var html = '';
            for (var i = 0; i < res.channels.length; i++) {
                html += '<li data-channelid=' + res.channels[i].channel_id + '>' + res.channels[i].name + '</li>';
            }
            self.$fmOrder.append(html);
        });
    },
    play: function(){
        if (this.audio.paused != true) {
            this.audio.pause();
            this.$play.removeClass('icon-bofang')
                      .addClass('icon-zanting');
        } else {
            this.audio.src=this.src;
            this.audio.play();
            this.$play.removeClass('icon-zanting')
                      .addClass('icon-bofang');
        }
    }
}

// wbplayer.prototype.play();
