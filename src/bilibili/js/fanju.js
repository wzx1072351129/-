'use strict';
EventUtil.addListener(window, 'load', fanju);

function fanju(){
    var listData=setData();
    var bottomData=setData2();
    (function(window,document){

        var oFanju=document.querySelector('#fanju');
        var oBox=oFanju.querySelector(".con-box");

        // 左侧列表数据 点击 更换
        var aTab = oFanju.querySelectorAll('.week li');

        var index=0;
        for(var i=0;i<aTab.length;i++){
            aTab[i].i=i;
            aTab[i].protoTxt=aTab[i].innerText;
            EventUtil.addListener(aTab[i],'click',changeList);
        }
         // 模拟鼠标事件(让最新列表内容初始化,添加列表)
         // 在添加完点击事件后,在执行事件,注意先后顺序
        var event=document.createEvent('MouseEvent');
        event.initMouseEvent('click');
        aTab[index].dispatchEvent(event);

        function changeList(){
            var showIndex=this.i-1;
            aTab[index].className="";
            aTab[index].innerText=aTab[index].protoTxt;
            index=this.i;
            aTab[index].className="on";
            if(showIndex != -1){
                 aTab[index].innerText='周'+aTab[index].protoTxt;
                var htmlStr=addTemple(listData[showIndex]);
                oBox.innerHTML=htmlStr;
            }else{
                var htmlStr='';
                var isNews=[],
                    isOld=[];
                for(var i=0;i<listData.length;i++){
                    for(var j=0;j<listData[i].length;j++){
                        var data=listData[i][j];
                        data.isNew ? isNews.push(data) : isOld.push(data) ;
                    }
                }
                var htmlStr=addTemple(isNews);
                htmlStr=addTemple(isOld,htmlStr);
                oBox.innerHTML=htmlStr;

            }

        }
        function addTemple(Datas,htmlStr){
            //有htmlStr则在原来的基础上添加
            //没有 默认是 ‘’ 空
            var htmlStr=htmlStr || '';
            for(var i=0,len=Datas.length;i<len;i++){
                var data=Datas[i];
                htmlStr+='<li class="con-item">';
                htmlStr+='    <a  class="imgA" href="javascript:;"><img src="img/fanju/'+data.imgUrl+'" alt=""></a>';
                htmlStr+='    <div class="r-text">';
                htmlStr+='        <a href="javascript:;" class="name">'+data.name+'</a>';
                htmlStr+='        <p class="news'+(data.isNew?' on':'')+'">更新至<span class="j-icon">'+data.num+'话</span></p>';
                htmlStr+='    </div>';
                htmlStr+='</li>';
            }
            return htmlStr;
        }


        /**************************************************************/

        //下面的 番剧动态 添加列表事件
        var oSubBox=oFanju.querySelector('.con .listbase');
        // console.log(oSubBox);
        function bottomAddList(){
            var urlImg='img/fanju/bb';
            var htmlStr='';
            for(var i=0,len=bottomData.length;i<len;i++){
                htmlStr+='<li class="item b-item">';
                htmlStr+='    <div class="imgbox b-imgbox">';
                htmlStr+='        <img src="'+urlImg+(i+1)+'.webp" alt="">';
                htmlStr+='        <div class="cove b-cove">';
                htmlStr+='            <p class="time">'+bottomData[i].time+'</p>';
                htmlStr+='        </div>';
                htmlStr+='    </div>';
                htmlStr+='    <p class="msg" title="'+bottomData[i].msg+'">'+bottomData[i].msg+'</p>';
                htmlStr+='    <p class="num">';
                htmlStr+='        <span class="play"><i></i>'+bottomData[i].plays+'</span><!--';
                htmlStr+='        --><span class="danmu"><i></i>'+bottomData[i].danmu+'</span>';
                htmlStr+='    </p>';
                htmlStr+='</li>';
            }
            // console.log(htmlStr);
            oSubBox.innerHTML=htmlStr;
        }
        bottomAddList();
        /**************************************************************/
        //特别推荐 鼠标事件
        function tbthEvent(){
            var oTbtj=oFanju.querySelector('.tbtj');
            var aTab=oTbtj.querySelectorAll('.tab span');
            var aMsg=oTbtj.querySelectorAll('.msg p');
            var oIbox=oTbtj.querySelector('.ibox');
            var  ssi=0;
            for(var i=0;i<aTab.length;i++){
                aTab[i].i=i;
                aMsg[i].i=i;
                EventUtil.addListener(aTab[i],'mouseenter',function(){
                    aTab[ssi].className='';
                    aMsg[ssi].style.opacity='0';
                    ssi=this.i;
                    aTab[ssi].className='on';
                    aMsg[ssi].style.opacity='1';

                    oIbox.style.marginLeft=(ssi*-260)+'px'
                });
            }
        }
        tbthEvent();


    })(window,document);

    function setData(){
        var listData = [
            [{  // 周一
                "name": "魔法少女 俺 ", //番剧名
                "num": "11", // 最新集数
                "isNew": false ,// 是否最新更新,
                "imgUrl":"1_1.webp",
            },{
                "name": "赛马娘",
                "num": "13",
                "isNew": true,
                "imgUrl":"1_2.webp",
            },{
                "name": "琴之森",
                "num": "10",
                "isNew": false,
                "imgUrl":"1_3.webp",
            },{
                "name": "樱花忍法帖",
                "num": "23",
                "isNew": false,
                "imgUrl":"1_4.webp",
            },{
                "name": "美男高校地球防卫部 HAPPY KISS！",
                "num": "10",
                "isNew": true,
                "imgUrl":"1_5.webp",
            },{
                "name": "魔法少女 俺（中配）",
                "num": "11",
                "isNew": false,
                "imgUrl":"1_6.webp",
            },{
                "name": "Four of a Kind 四牌士",
                "num": "11",
                "isNew": true,
                "imgUrl":"1_7.webp",
            },{
                "name": "智龙迷城",
                "num": "12",
                "isNew": true,
                "imgUrl":"1_8.webp",
            }],

            [{  // 周二
                "name": "黑色四叶草",
                "num": "36",
                "isNew": false,
                "imgUrl":"2_1.webp",
            },{
                "name": "宇宙战舰提拉米斯",
                "num": "11",
                "isNew": false,
                "imgUrl":"2_2.webp",
            },{
                "name": "高达创形者",
                "num": "11",
                "isNew": false,
                "imgUrl":"2_3.webp",
            },{
                "name": "飙速宅男 GLORY LINE",
                "num": "25",
                "isNew": false,
                "imgUrl":"2_4.webp",
            },{
                "name": "銀河英雄傳說 Die Neue These（僅限港澳台地區）",
                "num": "10",
                "isNew": false,
                "imgUrl":"2_5.webp",
            },{
                "name": "少年阿贝 GO!GO!小芝麻 第三季",
                "num": "9",
                "isNew": false,
                "imgUrl":"2_6.webp",
            },{
                "name": "蒼天之拳 REGENESIS（僅限港澳台地區）",
                "num": "11",
                "isNew": false,
                "imgUrl":"2_7.webp",
            }],

            [{  // 周三
                "name": "齐木楠雄的灾难 第二季",
                "num": "22",
                "isNew": false,
                "imgUrl":"3_1.webp",
            },{
                "name": "ALICE or ALICE",
                "num": "11",
                "isNew": false,
                "imgUrl":"3_2.webp",
            },{
                "name": "重神机潘多拉",
                "num": "12",
                "isNew": false,
                "imgUrl":"3_3.webp",
            },{
                "name": "鹿枫堂",
                "num": "10",
                "isNew": false,
                "imgUrl":"3_4.webp",
            },{
                "name": "重神机潘多拉（中配）",
                "num": "12",
                "isNew": false,
                "imgUrl":"3_5.webp",
            }],

            [{  // 周四
                "name": "博人传 火影忍者新时代",
                "num": "62",
                "isNew": false,
                "imgUrl":"4_1.webp",
            },{
                "name": "多田君不恋爱",
                "num": "11",
                "isNew": false,
                "imgUrl":"4_2.webp",
            },{
                "name": "Comic Girls",
                "num": "11",
                "isNew": false,
                "imgUrl":"4_3.webp",
            },{
                "name": "原书·原书使",
                "num": "10",
                "isNew": false,
                "imgUrl":"4_4.webp",
            },{
                "name": "Butlers～千年百年物语～",
                "num": "10",
                "isNew": false,
                "imgUrl":"4_5.webp",
            }],

            [{  // 周五
                "name": "超能力女儿",
                "num": "11",
                "isNew": false,
                "imgUrl":"5_1.webp",
            },{
                "name": "宅男腐女恋爱真难",
                "num": "10",
                "isNew": false,
                "imgUrl":"5_2.webp",
            },{
                "name": "Megalo Box",
                "num": "11",
                "isNew": false,
                "imgUrl":"5_3.webp",
            },{
                "name": "妖精森林的小不点",
                "num": "12",
                "isNew": false,
                "imgUrl":"5_4.webp",
            },{
                "name": "刀使巫女",
                "num": "23",
                "isNew": false,
                "imgUrl":"5_5.webp",
            },{
                "name": "全金属狂潮 Invisible Victory",
                "num": "8",
                "isNew": false,
                "imgUrl":"5_6.webp",
            },{
                "name": "敦君与女朋友",
                "num": "11",
                "isNew": false,
                "imgUrl":"5_7.webp",
            },{
                "name": "异世界居酒屋～古都阿伊特力亚的居",
                "num": "5",
                "isNew": false,
                "imgUrl":"5_8.webp",
            },{
                "name": "钱进球场",
                "num": "11",
                "isNew": false,
                "imgUrl":"5_9.webp",
            }],

            [{  //周六
                "name": "戒律的复活",
                "num": "22",
                "isNew": false,
                "imgUrl":"6_1.webp",
            },{
                "name": "我的英雄学院 第三季",
                "num": "49",
                "isNew": false,
                "imgUrl":"6_2.webp",
            },{
                "name": "皇帝圣印战记",
                "num": "23",
                "isNew": false,
                "imgUrl":"6_3.webp",
            },{
                "name": "恶魔战线",
                "num": "11",
                "isNew": false,
                "imgUrl":"6_4.webp",
            },{
                "name": "LOST SONG 失落的歌谣",
                "num": "12",
                "isNew": false,
                "imgUrl":"6_5.webp",
            },{
                "name": "Dies irae 神怒之日（僅限港澳台地區）",
                "num": "11",
                "isNew": false,
                "imgUrl":"6_6.webp",
            },{
                "name": "忍者少女千鸟～姐川·石山篇～",
                "num": "63",
                "isNew": false,
                "imgUrl":"6_7.webp",
            },{
                "name": "棒球大联盟 2",
                "num": "11",
                "isNew": false,
                "imgUrl":"6_8.webp",
            },{
                "name": "失憶融合WIXOSS（僅限港澳台地區）",
                "num": "11",
                "isNew": false,
                "imgUrl":"6_9.webp",
            },{
                "name": "藍海少女～advance～（僅限台灣地區）",
                "num": "11",
                "isNew": false,
                "imgUrl":"6_10.webp",
            },{
                "name": "暖暖日记 3rd",
                "num": "11",
                "isNew": false,
                "imgUrl":"6_11.webp",
            }],

            [{
                "name": "魔卡少女樱 CLEAR CARD篇",
                "num": "22",
                "isNew": false,
                "imgUrl":"7_1.webp",
            },{
                "name": "Fate/EXTRA Last Encore",
                "num": "10",
                "isNew": false,
                "imgUrl":"7_2.webp",
            },{
                "name": "女神异闻录5 动画版",
                "num": "11",
                "isNew": false,
                "imgUrl":"7_3.webp",
            },{
                "name": "Caligula 卡里古拉",
                "num": "11",
                "isNew": true,
                "imgUrl":"7_4.webp",
            },{
                "name": "鬼灯的冷彻 第二季 其二",
                "num": "24",
                "isNew": false,
                "imgUrl":"7_5.webp",
            },{
                "name": "DARLING in the FRANXX（僅限港澳台地區）",
                "num": "21",
                "isNew": false,
                "imgUrl":"7_6.webp",
            },{
                "name": "冷然之天秤",
                "num": "11",
                "isNew": true,
                "imgUrl":"7_7.webp",
            },{
                "name": "你还是不懂群马",
                "num": "11",
                "isNew": false,
                "imgUrl":"7_8.webp",
            },{
                "name": "百變小櫻Clear咭（僅限港澳地區）",
                "num": "22",
                "isNew": false,
                "imgUrl":"7_9.webp",
            },{
                "name": "温泉屋小女管家",
                "num": "10",
                "isNew": false,
                "imgUrl":"7_10.webp",
            },{
                "name": "美妙☆频道",
                "num": "11",
                "isNew": false,
                "imgUrl":"7_11.webp",
            },]
        ];
        return listData;
    }

    function setData2(){
        var data=[{
            "time":"3:39:00",
            "msg":"【舞台】战国无双：关原之章",//信息
            "plays":"1.1万",//播放
            "danmu":"335"//弹幕
        },{
            "time":"4:52:30",
            "msg":"【BD720P】妖精的尾巴 ZERØ 12集全【中日双字/诸神】",
            "plays":"2.2万",
            "danmu":"138"
        },{
            "time":"52:23",
            "msg":"【OVA】BLACK★ROCK SHOOTER【澄空】",
            "plays":"--",
            "danmu":"5.9万"
        },{
            "time":"02:39",
            "msg":"【字幕】模仿船梨精的齐藤壮马",
            "plays":"935",
            "danmu":"5"
        },{
            "time":"2:13:45",
            "msg":"【剧场版/1080P/中字】Code Geass 反叛的鲁路修 兴道【自制中字】",
            "plays":"26.3万",
            "danmu":"1.3万"
        },{
            "time":"10:27:06",
            "msg":"【国产】中华小子 01-26话（全）",
            "plays":"130.4万",
            "danmu":"18.0万"
        },{
            "time":"5:12:01",
            "msg":"【720P】NORN9 命运九重奏 全集【异域字幕组】",
            "plays":"3055",
            "danmu":"14"
        },{
            "time":"12:31",
            "msg":"【7月】徒然喜欢你 07",
            "plays":"280.2万",
            "danmu":"12.5万"
        },{
            "time":"1:00:57",
            "msg":"【合集】搞笑漫画日和 第一季",
            "plays":"341.6万",
            "danmu":"3.7万"
        },{
            "time":"5:37:01",
            "msg":"【天降之物BDRIP】第一季",
            "plays":"1025.0万",
            "danmu":"74.5万"
        }];
        return data;
    }
}
