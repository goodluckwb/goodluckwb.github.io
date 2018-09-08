    //面向对象图片放大预览组件.
    function ImgPerview(id){
        this.id=id;
        this.img=$(this.id);
    }
    ImgPerview.prototype={
        init:function(){
            var that=this;
            var heightY=$(window).height()||document.body.clientHeight;
            var html='<div class="mask" style="display:none;position:fixed;top:0;left:0;width:100%;height:'+heightY+'px;background:#333;z-index:2000">'
                html+='<span class="fas fa-times fa-3x" style="position:absolute;top:50px;right:60px;color:white;cursor:pointer;"></span>'
                html+='<div style="display:flex;justify-content:center;align-items:center;width:80%;height:100%;margin:0 auto;">'
                html+='<img id="img-box" src="" style="display:block;" /></div>'
                html+='<span class="fas fa-angle-right fa-5x" style="position:absolute;top:300px;right:50px;color:white;cursor:pointer;"></span>'
                html+='<span class="fas fa-angle-left fa-5x" style="position:absolute;top:300px;left:50px;color:white;cursor:pointer;"></span>'
                html+='</div>'
            $('body').append(html);
            that.img.each(function(index){
                that.img[index].index=index;
                $(this).on('click',function(){
                   
                    that.imgZoom(this);
                   
                })
            })
        },
        scale:function(obj){
            var bili1=$(obj).width()/$(obj).height();
            var bili2=$(obj).height()/$(obj).width();
            if($(obj).width()>$(obj).height()){
                $('#img-box')[0].style.width='100%';
                $('#img-box')[0].style.height= $('#img-box').width()*bili2+'px';
            }else{
                $('#img-box')[0].style.height='100%';
                $('#img-box')[0].style.width=$('#img-box').height()*bili1+'px';
            }
        },
        imgZoom:function(obj){
            var that=this;
            
            $('#img-box').attr('src',$(obj).attr('data-echo'));
            $('.mask').css('display','block').fadeIn();
            $('.fa-times').on('click',function(){
                $('.mask').css('display','none').fadeOut();
            })
            var current=obj.index;
            that.scale(obj);
            $('.fa-times').hover(
                function(){$(this).css('color','red')},
                function(){$(this).css('color','white')}
            )
            $('.fa-angle-right').hover(
                function(){$(this).css('color','#456')},
                function(){$(this).css('color','white')}
            )
            $('.fa-angle-left').hover(
                function(){$(this).css('color','#456')},
                function(){$(this).css('color','white')}
            )
            
            $('.fa-angle-right').on('click',function(){
                var x=current;
                if(x<that.img.length-2){
                    x++;
                }else{
                    x=-1;
                }
                $('#img-box').attr('src',that.img.eq(x).attr('data-echo'));
                that.scale(that.img.eq(x));
                return current=x;
            })
            $('.fa-angle-left').on('click',function(){
                var y=current;
                if(y>=1){
                    y--;
                }else{
                    y=that.img.length-1;
                }
                $('#img-box').attr('src',that.img.eq(y).attr('data-echo'));
                that.scale(that.img.eq(y));
                return current=y;
            })
        }
    }