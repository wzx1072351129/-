'use strict';
EventUtil.addListener(window, 'load', donghua);

function donghua(){
    var listData=setData();
    (function(window,document){

        var oDonghua=document.querySelector('#donghua');

        // 左侧列表数据添加
        var oBox=oDonghua.querySelector('.report-wrap-module .listbase');
        function addList(){
            var urlImg='img/donghua/ll';
            var htmlStr='';
            for(var i=0,len=listData.length;i<len;i++){
                htmlStr+='<li class="item b-item">';
                htmlStr+='    <div class="imgbox b-imgbox">';
                htmlStr+='        <img src="'+urlImg+(i+1)+'.webp" alt="">';
                htmlStr+='        <div class="cove b-cove">';
                htmlStr+='            <p class="time">'+listData[i].time+'</p>';
                htmlStr+='            <span></span>';
                htmlStr+='        </div>';
                htmlStr+='    </div>';
                htmlStr+='    <p class="msg" title="'+listData[i].msg+'">'+listData[i].msg+'</p>';
                htmlStr+='    <p class="num">';
                htmlStr+='        <span class="play"><i></i>'+listData[i].plays+'</span><!--';
                htmlStr+='        --><span class="danmu"><i></i>'+listData[i].danmu+'</span>';
                htmlStr+='    </p>';
                htmlStr+='</li>';
            }
            // console.log(htmlStr);
            oBox.innerHTML=htmlStr;
        }
        addList();

        //右侧排行榜 鼠标移入列表滑动事件
        var oBox=rankAddCopy(oDonghua);// 复制列表信息
        var oType=oDonghua.querySelectorAll('.zone-rank .rank-head p span');
        var index=0;
        for(var i=0;i<oType.length;i++){
            oType[i].i=i;
            EventUtil.addListener(oType[i],'mouseenter',function(){
                oType[index].className="";
                index= this.i;
                oType[index].className="on";
                oBox.style.marginLeft='-'+(100*index)+'%';
            });
        }



    })(window,document);

    function setData(){
        var listData = [{
            "time":"05:34 ",//时长
            "msg":"【MMD刀剑乱舞】北极星～Polaris～／鹤",//信息
            "plays":"3299",//播放
            "danmu":"32"//弹幕
        },{
            "time":"03:23",
            "msg":"【模型配布】嘻嘻两位警官来袭~_(:зゝ∠)_【固定镜头】",
            "plays":"2.3万",
            "danmu":"143"
        },{
            "time":"03:38",
            "msg":"【MMD】旗袍风诱惑·真实质感「极乐净土」",
            "plays":"--",
            "danmu":"208"
        },{
            "time":"03:01",
            "msg":"【齐灾手书MMD】大小姐和大少爷的反派生涯【齐木楠雄】【MMD自k帧】",
            "plays":"5272",
            "danmu":"159"
        },{
            "time":"07:52",
            "msg":"火影忍者 二十大经典战役之一 佐助vs鼬",
            "plays":"26.6万",
            "danmu":"1970"
        },{
            "time":"02:26",
            "msg":"【兄坑MMD】♢ 寄明月 ♢ [ 东方纤云 ]",
            "plays":"20.8万",
            "danmu":"3576"
        },{
            "time":"03:33",
            "msg":"【天官赐福|配音】天官幼儿园",
            "plays":"4.1万",
            "danmu":"262"
        },{
            "time":"09:51",
            "msg":"【银魂MAD】全员欢乐治愈向，笑一笑！！ o(≧v≦)o~~",
            "plays":"99.9万",
            "danmu":"4.6万"
        },{
            "time":"04:53",
            "msg":"【火影忍者博人传】巳月的仙人模式瞬间被秒,大筒木浦式才是真正的反派",
            "plays":"10.0万",
            "danmu":"239"
        },{
            "time":"26:40",
            "msg":"猩猩也能懂的东方project#东方天空璋（下）童子与秘神",
            "plays":"9075",
            "danmu":"618"
        }];
        return listData;
    }
}
