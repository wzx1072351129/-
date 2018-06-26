'use strict';
EventUtil.addListener(window, 'load', run);

function run(){
    (function(window,document){
        //banner
        var oWarp=document.querySelector('#chief_recommend .part-left');
        var oBanner=oWarp.querySelector('.banner');
        var aTil=oWarp.querySelectorAll('.title a');
        var aTag=oWarp.querySelectorAll('.tag span');
        var index=0;
        var timer=null;
        var i,len;
        aTag[index].className="on";
        aTil[index].style.opacity='1';
        for(i=0,len=aTag.length;i<len;i++){

            aTil[i].i=i;
            aTag[i].i=i;
            EventUtil.addListener(aTag[i],'click',function(){
                aTag[index].className="";
                aTil[index].style.opacity='0';
                index=this.i;
                change();
            });
        }
        EventUtil.addListener(oWarp,'mouseenter',function(){
            clearInterval(timer);
        })
        EventUtil.addListener(oWarp,'mouseleave',function(){
            auto();
        })
        auto();
        function auto(){
            timer=setInterval(function(){
                aTag[index].className="";
                aTil[index].style.opacity='0';
                index++;
                index%=len;
                change()
            },5000);
        }
        function change(){
            aTag[index].className="on";
            aTil[index].style.opacity='1';
            oBanner.style.transform="translateX(-"+(index*100/len)+"%)"
        }

    })(window,document);
}