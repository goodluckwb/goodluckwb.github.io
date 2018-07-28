//imgshow
var d=document.getElementById('leftshow');
var img=d.getElementsByTagName('img');
var num=0;
var len=img.length;
function show(test){
    if (test=="img[0]"){
        img[0].style.display='block';
        img[1].style.display='none';
        img[2].style.display='none';

    }else if (test=="img[1]"){
        img[0].style.display='none';
        img[1].style.display='block';
        img[2].style.display='none';
    }else if (test=="img[2]"){
        img[0].style.display='none';
        img[1].style.display='none';
        img[2].style.display='block';
    }
}
setTimeout('show()',3000);