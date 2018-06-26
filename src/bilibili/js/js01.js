'use strict';

EventUtil.addListener(window, 'load', run);

function run() {

    //head event
    (function(window, document) {
        var headWrap = document.querySelector('.bili-wrapper');

        //鼠标移入菜单,显示菜单
        function navShowEvent() {
            //获取可显示扩展的菜单
            var meunItems = headWrap.querySelectorAll('.nav-item'),
                meunArr = [],
                i,
                len;
            for (i = 0, len = meunItems.length; i < len; i++) {
                if (meunItems[i].children.length > 1) {
                    meunArr.push(meunItems[i]);
                }
            }
            //添加<投稿>
            meunArr.push(headWrap.querySelector('.up-load'));

            for (i = 0, len = meunArr.length; i < len; i++) {
                //为每个菜单添加 mouseenter 事件
                EventUtil.addListener(meunArr[i], 'mouseenter', function(e) {
                    var that=this;
                    var navBox = this.querySelector('.jsSel-h-showBox');
                    if (!navBox || that.isShow) return;

                    navBox.style.display = 'block';
                    setClassName(navBox, 'animation-slide-up', 'add');
                    setTimeout(function() {
                        that.isShow=true;
                        setClassName(navBox, 'animation-slide-up', 'remove');
                    }, 300)

                });
                //为每个菜单添加 mouseleave 事件
                EventUtil.addListener(meunArr[i], 'mouseleave', function(e) {

                    this.isShow=false;
                    var navBox = this.querySelector('.jsSel-h-showBox');
                    if (!navBox) return;
                    setClassName(navBox, 'animation-slide-down', 'add');
                    setTimeout(function() {
                        setClassName(navBox, 'animation-slide-down', 'remove');
                        navBox.style.display = 'none';
                    }, 300)
                });
            }
        }

        //history event 添加<历史>信息列表
        function addHistory() {
            var showBox = headWrap.querySelector('.history-wnd');
            var data = headData.history.data,
                htmlArr = [];
            for (var i = 0; i < data.length; i++) {
                var record = data[i].record;
                htmlArr.push('<ul class="list history">');
                htmlArr.push('    <div>');
                htmlArr.push('        <li class="timeline">');
                htmlArr.push('            <span class="date">' + data[i].date + '</span>');
                htmlArr.push('        </li>');
                for (var j = 0; j < record.length; j++) {
                    htmlArr.push('    <li title="' + record[j].link + '">');
                    htmlArr.push('        <div class="link">' + record[j].link + '</div>');
                    htmlArr.push('        <div class="state fr">');
                    htmlArr.push('            <span class="progress">' + record[j].state.progress + '</span>');
                    htmlArr.push('            <i class="device ' + record[j].state.device + '"></i>');
                    htmlArr.push('        </div>');
                    htmlArr.push('    </li>');
                }
                htmlArr.push('    </div>');
                htmlArr.push('</ul>');
            }
            htmlArr.push('<div class="read-more">');
            htmlArr.push('   查看更多<i class="bi-icon b-icon-arrow-r"></i>');
            htmlArr.push('</div>');
            showBox.innerHTML = htmlArr.join('');
        }

        //favorite event 添加<收藏>列表
        function addFavorite() {
            var showBox = headWrap.querySelector('.favorite-wnd');
            var data = headData.favority.link,
                htmlArr = [];
            htmlArr.push('<ul class="list history">');
            htmlArr.push('    <div>');
            for (var i = 0; i < data.length; i++) {
                htmlArr.push('     <li>');
                htmlArr.push('         <div class="link" title="' + data[i] + '">' + data[i] + '</div>');
                htmlArr.push('     </li>');
            }
            htmlArr.push('    </div>');
            htmlArr.push('</ul>');
            htmlArr.push('<div class="read-more">');
            htmlArr.push('   查看更多<i class="bi-icon b-icon-arrow-r"></i>');
            htmlArr.push('</div>');
            // console.log(htmlArr.join(''));
            showBox.innerHTML = htmlArr.join('');
        }

        //dynamic event <动态>事件
        function DynamicEvent() {
            var meun = headWrap.querySelector('.dyn-meun'),
                meuns = meun.querySelectorAll('li'),
                line = meun.querySelector('.line'),
                i, len;
            for (i = 0, len = meuns.length; i < len; i++) {
                EventUtil.addListener(meuns[i], 'click', meunClick);
            }
            //为菜单添加点击交互事件
            function meunClick() {
                //移动下划线
                line.style.left = this.offsetLeft + 6 + 'px';
                //showBox交互事件
                var type = this.getAttribute('data-type');
                addContent(type);
            }

            addContent('video');

            function addContent(type) {
                var showBox = headWrap.querySelector('.dyn-list-warpper');
                var readMore = headWrap.querySelector('.read-more');
                var data = headData.dynamic[type],
                    htmlArr = [];
                // console.log(data);
                htmlArr.push('<ul class="dyn-list">');
                if (data != "none") {
                    if (data.latestData.length > 0) {
                        htmlArr.push('    <span>');
                        addItem(data.latestData);
                        htmlArr.push('    </span>');
                    } else {
                        htmlArr.push('    <li class="no-data">');
                        htmlArr.push('        暂时没有新动态了哦！');
                        htmlArr.push('    </li>');
                    }
                    htmlArr.push('    <li class="d-data history">');
                    htmlArr.push('        <div class="history-tag"> 历史动态 </div>');
                    htmlArr.push('    </li>');
                    htmlArr.push('    <span>');
                    addItem(data.historyData);
                    htmlArr.push('    </span>');
                    htmlArr.push('</ul>');
                    readMore.style.display = "block";

                } else {
                    htmlArr.push('    <li class="no-data">');
                    htmlArr.push('        暂时没有新动态了哦！');
                    htmlArr.push('    </li>');
                    readMore.style.display = "none";
                }
                showBox.innerHTML = htmlArr.join('');

                function addItem(newData) {
                    for (var i = 0, len = newData.length; i < len; i++) {
                        htmlArr.push('<li class="d-data">');
                        htmlArr.push('    <div class="preview">');
                        htmlArr.push('        <a href="javascript:;"><img src="' + newData[i].previewImg + '" alt="' + newData[i].content.info + '"></a>');
                        htmlArr.push('    </div>');
                        htmlArr.push('    <div class="con">');
                        htmlArr.push('        <div class="title">');
                        if (newData[i].type == 'video')
                            htmlArr.push('        <span class="sp">番剧</span>');
                        htmlArr.push('            <a href="javascritp:;">' + newData[i].content.title + '</a>');
                        htmlArr.push('            <span>' + newData[i].content.state + '</span>');
                        htmlArr.push('        </div>');
                        htmlArr.push('        <div class="info">');
                        htmlArr.push('            <a href="javascript:;">' + newData[i].content.info + '</a>');
                        htmlArr.push('        </div>');
                        htmlArr.push('    </div>');
                        htmlArr.push('</li>');
                    }
                }
            }
        }
        navShowEvent();
        addHistory();
        addFavorite();
        DynamicEvent();
    })(window, document);

    //特效
    (function(window, document){
        //  <  滑动特效
        var  aSubli=document.querySelectorAll('.primary_menu .li1 .sub-nav li');

        for(var i=0,len=aSubli.length;i<len;i++){
            EventUtil.addListener(aSubli[i],'mouseenter',function(){
                var oA=this.querySelector('a');
                var oI=this.querySelector('i');
                oI.stylePos=oI.style.left;
                oI.style.left=(oA.clientWidth+10)+'px';
            });
            EventUtil.addListener(aSubli[i],'mouseleave',function(){
                var oI=this.querySelector('i');
                oI.style.left=oI.stylePos;
            });
        }
    })(window, document);

}