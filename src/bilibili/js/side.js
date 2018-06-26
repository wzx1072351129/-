 $(function(){
    var $ulBox=$("#slide .box") ;
    var $slideLi=$("#slide .box li.tab") ;
    var $conLi=$(".warp-box .m-item");

    var $col=$("#slide .box #col");
    var liHei=$slideLi.height();

    var KK=true;

    var last_index=-1;//用于 130 index改变 判断
    var boxHei=$ulBox.height();
    $(window).scroll(function(){
        //解决导航定位
        var winTop=$(document).scrollTop();
        var winHei=$(window).height();

        var Top=(winHei- boxHei)/2;
        //防止导航到屏幕之上
        Top=Math.max(0,Top);
        //当窗口改变从新计算导航位置
        $(window).resize(function(){
            winHei=$(window).height();
            Top=(winHei- boxHei)/2;
            Top=Math.max(0,Top);
            $ulBox.css({
                top:Top+"px",
            });
        });

        //窗口滚动大于300 导航居中
        if(winTop>300){
            $ulBox.css({
                top:Top+"px",
                transition:"top 0.2s"
            });
        }else{
            $ulBox.css("top","242px");
            last_index=-1;
        }

        //KK 点击导航跳转 阻止窗口滚动事件计算 当前导航位置
        if(KK){
            if(winTop<300){
                $slideLi.removeClass('now');
            }
            var index;
            var length=$slideLi.length;

            //跳出循环使用 for-->break (each()不行)
            for(var i=0;i<length;i++){
                var top=$conLi.eq(i).offset().top;
                // if(winTop<top){
                if((winTop-winHei/4)<top  && winTop>300){
                    index=i;
                    if(index<0)index=0;
                    //当这一次的index与上一次index不一样是执行内容
                    if(last_index!=index){
                        $slideLi.eq(index).addClass("now").siblings().removeClass("now");
                        $col.css({
                            top:$slideLi.eq(index).position().top+"px"
                        });
                        console.log(1+' '+last_index+' '+index);
                    }
                    last_index=index;
                    break;
                }
            }
        }
    });

    $slideLi.click(function(){
        //点击导航时阻止滚动事件的判断
        KK=false;
        var i=$(this).index();
        // console.log($conLi.eq(i).offset().top);
        $("body,html").animate({
            scrollTop:$conLi.eq(i).offset().top
        },500,function(){
            // setTimeout(function(){KK=true;},100)
            setTimeout(function(){
                KK=true;
            },200);

        });
        $(this).addClass("now").siblings().removeClass("now");

        //col 滑动动画
        $col.stop(true).show().animate({
            top:$slideLi.eq(i).position().top+"px"
        },100,function(){
            $(this).hide();
        });
    }).hover(function(){
        $(this).addClass("on");
    },function(){
        $(this).removeClass("on");
    });


    // 返回顶部
    var $backTop=$('#slide .back-top');
    $backTop.click(function(){
        // KK=false;
        $("body,html").animate({
            scrollTop:0
        },500,function(){
            $slideLi.removeClass('now');
        });
    });
});