'use strict';
var EventUtil = {
    //添加事件处理程序
    addListener: function(target, type, handler) {
        if (target.addEventListener) {
            target.addEventListener(type, handler);
        } else if (target.attachEvent) {
            target.attachEvent('on' + type, function() {
                //ie事件处理程序中的this的指向是全局环境(window)
                //让handler的this指向target
                handler.call(target);
            });
        } else {
            target['on' + type] = bandler;
        }
    },
    //移除事件处理程序
    removeListener: function(target, type, handler) {
        if (target.removeEventListener) {
            target.removeEventListener(type, handler);
        } else if (target.detachEvent) {
            target.detachEvent('on' + type.handler);
        } else {
            target['on' + type] = null;
        }
    },
    //获取事件对象
    getEvent: function(e) {
        return window.event || e;
    },
    //获取目标对象
    getTarget: function(e) {
        e = EventUtil.getEvent(e);
        return e.srcElement || e.target
    },
    //阻止默认行为
    preventDefault: function(e) {
        e = EventUtil.getEvent(e);
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    },
    //停止冒泡
    stopPropagation: function(e) {
        e = EventUtil.getEvent(e);
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    },
    //获取相关元素
    getRelatedTarget: function(e) {
        e = EventUtil.getEvent(e);
        if (e.relatedEvent) {
            return e.relatedTarget;
        } else if (e.toElement) {
            return e.toElement;
        } else if (e.fromElement) {
            return e.formElement;
        } else {
            return null;
        }
    },
    //获取keyCode
    getCharCode: function(e) {
        e = EventUtil.getEvent(e);
        if (typeof e.charCode == 'number') {
            return e.charCode;
        } else {
            return e.keyCode;
        }
    },
};

function setClassName(obj, _name, _type) {
    var type = _type || 'add';

    var name = obj.className.split(' ');
    // console.log(type+'  '+obj.className);
    switch (type) {
        case 'add':
            if (name.length != 0) {
                for (var i = 0; i < name.length; i++) {
                    if (name[i] == _name) {
                        // console.log(name[i]+'  '+_name);
                        break;
                    }
                }
            }
            obj.className = obj.className + ' ' + _name;
            break;
        case 'remove':
            if (name.length > 0) {
                for (var i = name.length; i >= 0; i--) {
                    if (name[i] == _name) name.splice(i, 1);
                }
                obj.className = name.join(' ');
            } else {
                alert('没有该名字');
            }
            break;
    }
} //end setClassName

function rankAddCopy(element){
    var oWarp=element.querySelector('.zone-rank .con-box');
    oWarp.innerHTML+=oWarp.innerHTML;
    return oWarp;
}