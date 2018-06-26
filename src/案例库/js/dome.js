/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-07-28 13:40:46
 * @version $Id$
 */
$(function(){
    var numX = 5,numY = 5,numZ = 5,sum;
    sum = numX * numY * numZ;   // 暂且认为li个数为 5*5*5 个

    var Rand=[];    //全局 打乱 数组
    Init();         //初始化

    //获取菜单点击
    $("#styleBtn li").click(function(ev){
        ev=ev||window.event;
        ev.stopPropagation();
        var Btn=$(this).index();

        switch(Btn){
            case 0:
                Table();    //元素周期分布
                break;
            case 1:
                Sphere();   //球体分布
                break;
            case 2:
                Helix();    //螺旋分布
                break;
            case 3:
                Grid();     //立体矩阵分布
                break;
        }
    });

    // 初始随机分布
    function Init(){
        for(var i=0;i<sum;i++){
            var _x=Math.floor((Math.random()-0.5)*5000);
            var _y=Math.floor((Math.random()-0.5)*5000);
            var _z=Math.floor((Math.random()-0.5)*5000);

            //定义所选择的 dome
            var dome_num=i%domeJson.length;
            //创建li  案例菜单
            var $li=$('<li><p class="type">'+domeJson[dome_num].type+'</p><p class="title">'+domeJson[dome_num].title+'</p><p class="date">'+domeJson[dome_num].date+'</p><p class="index" Index="'+dome_num+'" Src="'+domeJson[dome_num].src+'">'+i+'</p></li>');
            $li.css({
               "transform":"translate3d("+_x+"px,"+_y+"px,"+_z+"px)"
            });
            $("#main").append($li);
        }

    setTimeout(function(){  //定时 开场动画
            Grid();
            Menu();
        },300);
    }

    // 菜单动画
    function Menu(){
        $("#styleBtn").css({
            "transform":"scale(1)",
            "opacity":"1"
        });
    }
    //元素周期分布
    function Table(){
        var column_num=18;
        var row_num=Math.ceil(sum/18);
        var tX=150;
        var tY=190;
        var firstX=-column_num/2*tX+60;
        var firstY=-Math.ceil(row_num/2)*tY;

        var _x=0,_y=0;

        //前18个自定义布局
        var arr = [
            {x:firstX,y:firstY},
            {x:firstX+17*tX,y:firstY},
            {x:firstX , y:firstY+tY },
            {x:firstX+tX , y:firstY+tY},
            {x:firstX+12*tX , y:firstY+tY },
            {x:firstX+13*tX , y:firstY+tY },
            {x:firstX+14*tX , y:firstY+tY },
            {x:firstX+15*tX , y:firstY+tY },
            {x:firstX+16*tX , y:firstY+tY },
            {x:firstX+17*tX , y:firstY+tY },
            {x:firstX , y:firstY+tY*2 },
            {x:firstX+tX , y:firstY+tY*2},
            {x:firstX+12*tX , y:firstY+tY*2 },
            {x:firstX+13*tX , y:firstY+tY*2 },
            {x:firstX+14*tX , y:firstY+tY*2 },
            {x:firstX+15*tX , y:firstY+tY*2 },
            {x:firstX+16*tX , y:firstY+tY*2 },
            {x:firstX+17*tX , y:firstY+tY*2 }];
        $("#main li").each(function(i){
            if(i<18){
                _x=arr[i].x;
                _y=arr[i].y
            }else{
                _x=firstX+i%column_num*tX;
                _y=firstY+(Math.floor(i/column_num)+2)*tY;
            }
            $(this).css({
                "transform":"translateX("+_x+"px) translateY("+_y+"px)"
            });
        });

    }

    //球形分布
    function Sphere(){

        var arr=[1,5,7,11,17,22,19,16,12,9,3,1];

        var index_c,num;    //第几行,第几个
        var firstRotX=-90;  //第一个顶部 X轴旋转角度
        var firstRotY=0;    //第一个y轴角度
        var tRotY;
        var tRotX=180/(arr.length-1);

        var _x,_y,_z=1000;
        upset();
        $("#main li").each(function(I){
            j=Rand[I];      //随机一下
            var sum=0;

            for(var i=0;i<arr.length;i++){
                sum+=arr[i];
                if(sum>j){
                    index=i;
                    num=arr[i]-(sum-j);
                    break;
                }
            }
            tRotY=360/arr[index];
            _x=firstRotX+tRotX*index;
            _y=firstRotY+tRotY/2+tRotY*num;

            $(this).css({
                "transform":"rotateY("+_y+"deg) rotateX("+_x+"deg) translateZ("+_z+"px)"
            });
        });
        // function bodong(dec){        //随机波动函数
        //     return (Math.random()-0.5)*0.2*dec+1;
        // }
    }

    // 螺旋分布
    function Helix(){
        var rotY=10;    //间距
        var tz=1000;    //螺旋直径
        var ty=10;      //高度梯度

        var firstY=-1*Math.floor(sum/2)*ty;

        upset();
        $("#main li").each(function(I){

            i=Rand[I];
            $(this).css({
                 "transform":"rotateY("+(i*rotY)+"deg) translateZ("+tz+"px) translateY("+(firstY+ty*i)+"px)"
            });
        });
    }

    // 矩阵分布
    function Grid(){
        var tx=300;     // 水平 垂直间隔
        var ty=300;
        var tz=600;

        var firstX=-2*tx;   //第一个li水平偏移量
        var firstY=-2*ty;   //第一个li垂直偏移量
        var firstZ=-2*tz;   //第一个li Z轴偏移量

        upset();
        $("#main li").each(function(I){
            // var i=parseInt($(this).attr(Index));
            i=Rand[I];

            // console.log(i);


            var _x=(i%(numX *numY))%numX;// x方向，要增加的倍数
            var _y=parseInt((i%(numX *numY))/numX);//y方向，要增加的倍数
            var _z=parseInt(i/(numX *numY));//z方向，要增加的倍数

            $(this).css({
                "transform":"translate3d("+(firstX+_x*tx)+"px,"+(firstY+_y*ty)+"px,"+(firstZ+_z*tz)+"px)"
            });
        })
    }



    // 拖拽 滚轮
    (function(){
        var nowx,lastx,minusx=0;
        var nowy,lasty,minusy=0;
        var roX=0,roY=0;

        var m_z=-1500;

        var timer1,timer2;

        $("#warp").mousedown(function(ev){
            ev=ev||window.event;
            lastx=ev.clientX;
            lasty=ev.clientY;
            clearInterval(timer1);

            $(this).on("mousemove",function(ev){
                ev=ev||window.event;    //ev 事件对象存放事件的相关信息

                nowx=ev.clientX;        // ev.clientX  clientX属性存放鼠标x坐标
                nowy=ev.clientY;

                minusx=nowx-lastx;      // 两者差值
                minusy=nowy-lasty;

                roX-=minusy*0.2;
                roY+=minusx*0.2;

                $("#main").css({
                    "transform":"translateZ("+m_z+"px) rotateX("+roX+"deg) rotateY("+roY +"deg)"
                });
                lastx=nowx;             // 存放前一点的x坐标
                lasty=nowy;
            })
        }).mouseup(function(){          //鼠标拖拽转动
            $(this).off("mousemove");

            timer1=setInterval(function(){//缓慢停止定时器
                minusx*=0.95;
                minusy*=0.95;
                if((Math.abs(minusx)<0.5)&&(Math.abs(minusy)<0.5))clearInterval(timer1);
                roX-=minusy*0.2;
                roY+=minusx*0.2;

                $("#main").css({
                    "transform":"translateZ("+m_z+"px) rotateX("+roX+"deg) rotateY("+roY +"deg)"
                });
            },15);

        }).mousewheel(function(e,d){    // 鼠标滚轮缩放
            clearInterval(timer2);
            m_z+=d*15;
            m_z=Math.min(400,m_z);
            m_z=Math.max(-2700,m_z);
            $("#main").css({
                 "transform":"translateZ("+m_z+"px) rotateX("+roX+"deg) rotateY("+roY +"deg)"
            });
            timer2=setInterval(function(){//缓慢停止定时器
                d*=0.98;
                if((Math.abs(d)<0.05)&&(Math.abs(d)<0.05))clearInterval(timer2);
                m_z+=d*15;
                m_z=Math.min(400,m_z);
                m_z=Math.max(-2700,m_z);
                // console.log(d);
                $("#main").css({
                     "transform":"translateZ("+m_z+"px) rotateX("+roX+"deg) rotateY("+roY +"deg)"
                });
            });
        });
    })();

    //随机打乱
    function upset(){
        Rand=[];
        var oLi= document.getElementById("main").getElementsByTagName("li");
        for (var i = 0;i<oLi.length; i++) {
            Rand.push(i);
        }
        Rand.sort(function(){return 0.5-Math.random()});
        // alert(arr);
    }

    //点击li 窗口弹出
    (function(){
        var $li=$("#main li");
        var $show=$("#show");
        var Index;
        var Title,Img,Dec,Time,Src;

        var hideMode=true;

        var html_title=$("html").find("title").html();
        $li.click(function(ev){
            ev=ev||window.event;
            ev.stopPropagation();

            Index=$(this).find(".index").attr("Index");
            // alert(Index);

            Title=domeJson[Index].title;    //这里的 0 是Index
            Img=domeJson[Index].img;
            Dec=domeJson[Index].dec;
            Time=domeJson[Index].date;
            Src=domeJson[Index].src;
            $show.find(".s_title").html(Title);
            $show.find(".s_img img").attr("src",Img);
            $show.find(".s_dec").html(Dec);
            $show.find(".s_date").html(Time);
            if(hideMode){
                hideMode=false;
                $show.fadeIn(1000).css({
                    "transform":"rotateY(0deg) scale(1)"
                });
            }
        });
        //点击页面其他部分 隐藏 窗口
        $(document).click(function(){
            $show.fadeOut(1000,function(){
                hideMode=true;
                $(this).css({
                     "transform":"rotateY(0deg) scale(1.5)"
                });
            }).css({
                "transform":"rotateY(180deg) scale(0.1)"
            });
        });
        //点击窗口 切换到案例窗口
        $show.click(function(ev){
            ev=ev||window.event;
            ev.stopPropagation();

            var new_html_title=html_title+"-"+Title;
            $("html").find("title").html(new_html_title);
            $("#warp").animate({
                "right":"100%"
            },1000,function(){
                hideMode=true;
                $show.css({
                    'transform' : 'rotateY(0deg) scale(1.5)',
                    display : 'none'
                });
            });
            $("#iframe").show().animate({
                "left":"0"
            },1000).find("iframe").attr("src",Src);
            // $("#ifarme").find("iframe").a
        });
        //案例窗口 back 返回 案例库窗口
        $("#iframe .back").click(function(ev){
            ev=ev||window.event;
            ev.stopPropagation();
            $("#warp").animate({
                "right":"0"
            },1000);
            $("#iframe").animate({
                "left":"100%"
            },1000,function(){
                $("#iframe").find("iframe").attr("src","");
                $("html").find("title").html(html_title);
            });
        })
    })();
})
