var boo=false;//判断按钮是否被按下
        var result=0;//存储数据
        var ope;//记录前一个计算符
        //定义全局函数
        function $(x){
            return document.getElementById(x);
        }
        //输入框数字叠加处理
       function num(num){
           var txt=$('txtnum');
           //是否有按钮被按下
           if(boo){
               txt.value=num;
               boo=false;
           }else{

               if(txt.value=="0"){
                   txt.value=num;
               }else{
                   txt.value+=num;
               }          
           }
          
       }
       //输入框小数点的输入
       function dec(){
           var txt=$('txtnum');
           //去重
           if(txt.value.indexOf('.')==-1){
               txt.value+='.';
           }
           boo=false;
       }
       //计算功能
       function compute(op){
           var onum=$('txtnum').value;
           if(onum==''){onum=0}
           boo=true;
          switch (ope) {
              case "+":
                result+=parseFloat(onum);  
                  break;
              case "-":
                result-=parseFloat(onum);  
                  break;
              case "*":
                result*=parseFloat(onum);  
                  break;
              case "/":
                result/=parseFloat(onum);  
                  break;
              case "=":
                result=parseFloat(onum);  
                  break;
              case "%":
                result%=onum;  
                  break;
              case "x^y":
                result=Math.pow(result,onum);  
                  break;
              case "i":
                result=Math.round(result);  
                  break;
          
              default:
                result=parseFloat(onum);
                  break;
          }
           $('txtnum').value=result; 
           ope=op;
       }
       //取反
       function zf(){
            $('txtnum').value*=-1;
       }
       //退格
       function backspace(){
           var txt=$('txtnum');
           txt.value=txt.value.substring(0,txt.value.length-1);
           if(txt.value==''){
               txt.value=0;
           }
       }
       //阶乘
       function jc(a){
           if(a==1){return 1;}
           else{
               return jc(a-1)*a;
           }
       }
       //三角函数
       function math(op){
           var onum=$('txtnum').value;
           boo=true;
           with(Math){
               switch (op) {
                   case 'sin':result=sin(onum);break;
                   case 'cos':result=cos(onum);break;
                   case 'tan':result=tan(onum);break;
                   case 'asin':result=asin(onum);break;
                   case 'acos':result=acos(onum);break;
                   case 'atan':result=atan(onum);break;
                   case 'PI':result=PI;break;
                   case '1/x':result=1/onum;break;
                   case 'exp':result=exp(onum);break;
                   case 'lnx':result=log(onum);break;
                   case 'lgx':result=log(onum)/log(10);break;
                   case 'n!':result=jc(onum);break;
                  
                   default:result=parseFloat(onum); break;
               }
           }
           $('txtnum').value=result;
       }
    
//文档中显示与隐藏
function showJsq(){
    var div=$('jisuanqi');
   if( div.style.display=='block'){
       div.style.display='none';
   }else{
       div.style.display="block";
   }
}