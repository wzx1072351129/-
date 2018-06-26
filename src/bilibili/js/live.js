EventUtil.addListener(window, 'load', liveEvent);
function liveEvent(){
    var listData=setData();
    (function(window, document){
        // console.log(oBox);
        // 左部分列表 数据添加
        var oBox=document.querySelector('#nav-live .l-left .ll-con .list-nav');
        function addList(){
            var urlImg='img/live/con-';
            var htmlStr='';
            for(var i=0,len=listData.length;i<len;i++){
                htmlStr+='<li class="li1">'
                htmlStr+=    '<div class="img-box">'
                htmlStr+=        '<img src="'+urlImg+(i+1)+'-1.webp" alt="">'
                htmlStr+=        '<div class="cove" style="background-image:url('+urlImg+(i+1)+'-0.webp);">'
                htmlStr+=            '<p class="text">'
                htmlStr+=                '<span class="aouther">'+listData[i].aouther+'</span>'
                htmlStr+=                '<span class="plays">'+listData[i].plays+'</span>'
                htmlStr+=            '</p>'
                htmlStr+=        '</div>'
                htmlStr+=    '</div>'
                htmlStr+=    '<p class="msg">'+listData[i].msg+'</p>'
                htmlStr+=    '<p class="pt">'+listData[i].pt+'</p>'
                htmlStr+='</li>'
            }
            // console.log(htmlStr);
            oBox.innerHTML=htmlStr;
        }

        // 右部分事件
        function rightEvent(){
            var oRight=document.querySelector('#nav-live .l-right');
            var aTabs=oRight.querySelectorAll('.tab span');
            var oTabBox=oRight.querySelector('.tab-box');
            var boxWid=oRight.clientWidth;
            var  index=2;
            aTabs[index].className='on';
            oTabBox.style.marginLeft='-'+(index*boxWid)+'px';
            for(var i=0,len=aTabs.length;i<len;i++){
                aTabs[i].i=i;
                EventUtil.addListener(aTabs[i],'click',function(){
                    aTabs[index].className='';
                    index= this.i;
                    aTabs[index].className='on';
                    oTabBox.style.marginLeft='-'+(index*boxWid)+'px';
                });
            }

            var oTrigs=oTabBox.querySelectorAll('.trig span');
            var oTitles=oTabBox.querySelectorAll('.title a');
            var oPicBox=oTabBox.querySelector('.pic');
            var tabIndex=0;
            oTrigs[tabIndex].className=oTitles[tabIndex].className="on";
            oPicBox.style.marginLeft='-'+(tabIndex*boxWid)+'px';
            for(var i=0;i<oTrigs.length;i++){
                oTrigs[i].i=i;
                EventUtil.addListener(oTrigs[i],'mouseenter',function(){
                    oTrigs[tabIndex].className=oTitles[tabIndex].className="";
                    tabIndex=this.i;
                    oTrigs[tabIndex].className=oTitles[tabIndex].className="on";
                    oPicBox.style.marginLeft='-'+(tabIndex*boxWid)+'px';
                });
            }

        }
        rightEvent();
        addList();
    })(window, document);

    function setData(){
        var listData = [{
            "aouther":"yuki琥珀",//作者
            "plays":"1.6万",//播放量
            "msg":"变人",//信息
            "pt":"游戏 · 其他游戏"//类型
        },{
            "aouther":"戏子大毒瘤",
            "plays":"1.2万",
            "msg":"白日依山尽，备战全挑衅",
            "pt":"手游 · 王者荣耀"
        },{
            "aouther":"诺夏夏夏夏夏",
            "plays":"4.7万",
            "msg":"诺夏辅助上分教学",
            "pt":"游戏 · 英雄联盟"
        },{
            "aouther":"有栖川z子",
            "plays":"490",
            "msg":"感冒主播性感鼻音在线唱歌",
            "pt":"娱乐 · 视频唱见"
        },{
            "aouther":"波喵喵喵",
            "plays":"2.6万",
            "msg":"你的喵啊",
            "pt":"娱乐 · 才艺"
        },{
            "aouther":"荔枝小烤鱼",
            "plays":"247",
            "msg":"卡卡更健康",
            "pt":"娱乐 · 视频聊天"
        },{
            "aouther":"狐狸小叔叔",
            "plays":"763",
            "msg":"【公子音】全球花式破音冠军",
            "pt":"娱乐 · 唱见电台"
        },{
            "aouther":"小魔女墨白",
            "plays":"446",
            "msg":"【御姐唱见】能不能给我打call呢",
            "pt":"娱乐 · 视频聊天"
        },{
            "aouther":"枫言w",
            "plays":"5.2万",
            "msg":"崩一会",
            "pt":"手游 · 崩坏"
        },{
            "aouther":"奈さま",
            "plays":"2.8万",
            "msg":"撅腚求生：相声，小品，魔术杂技",
            "pt":"游戏 · 绝地求生"
        } ];
        return listData;
    }
}