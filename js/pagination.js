$(function(){
    var page=$('.pagination');
    var pagenum;
    function pagination(pagenum){
        var html='<span class="previouspage">前</span><div class="pagination-fixed"><ul>'
        for(let i=1;i<pagenum+1;i++){
            html+='<li>'+i+'</li>';
        }
        html+='</ul></div><span class="nextpage">后</span>';
        page.append(html);
    }
    pagination(10);
    var con=$('#pagination-container'),
        li=$('.pagination ul li'),
        pre=$('.previouspage')[0],
        next=$('.nextpage')[0],
        ul=$('.pagination ul')[0],
        current=0;
    con.load('./source/html/article1.html');
    $(li[0]).addClass('active');
    var step=$(li[0]).outerWidth(true);
    li.each(function(index){
        $(li[index]).on('click',function(){
            con.load('./source/html/article'+(index+1)+'.html');
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            if(index>current&&index>1&&index<li.length-4){
                ul.style.left=-step*(index-1)+"px";
            }else if(index<current&&index>0&&index<li.length-4){
                ul.style.left=-step*(index-1)+'px';
            }
            return current=index;
        })
    })
    $(pre).on('click',function(){
        if(current>=1){
            li[current-1].click();
        }else{

        }
    })
    $(next).on('click',function(){
        if(current<li.length-1){
            li[current+1].click();
        }else{

        }
    })
})
