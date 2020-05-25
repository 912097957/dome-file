/*
 * @Author: Tom Shelby
 * @LastEditors: Tom Shelby
 * @Date: 2020-05-04 16:11:45
 * @LastEditTime: 2020-05-04 16:27:36
 * @Description: file content
 */

/*
 * @description: 根据id属性的值,返回对应的标签元素
 * @param {type} id属性的值,string类型
 * @return: 元素对象
 */

function my$(id) {
    return document.getElementById(id);
}

/* @兼容性
 * @description: 获取任意标签中的任意文本内容
 * @param {type} 标签对象
 * @return: 元素对象的文本内容
 */

function getInnerText(element) {
    if (typeof element.textContent == "undefined") { //不支持
        return element.innerText;
    } else {
        return element.textContent;
    }
}

/* @兼容性
 * @description: 设置任意标签中的任意文本内容
 * @param {type} 标签对象,设置文本内容
 * @return: 设置后元素对象新的的文本内容
 */

function setInnerText(element, text) {
    //判断浏览器是否支持这个属性
    if (typeof element.textContent == "undefined") { //不支持
        element.innerText = text;
    } else {
        element.textContent = text;
    }
}

/* @兼容性
 * @description: 获取任意一个父级元素的第一个子级元素
 * @param {type} 标签id
 * @return: 第一个子元素
 */

function getFirstElement(element) {
    // element.firstChild--->谷歌获取的是第一个子节点
    // element.firstChild--->IE8获取的是第一个子元素
    // element.firstElementChild--->谷歌获取的是第一个子元素,IE8不支持
    if (element.firstElementChild) { // 不为undefined,判定为true,直接使用里面的方法
        return element.firstElementChild;
    } else {
        var node = element.firstChild; //第一个子节点 ,定义一个变量接受比较严谨,万一某个浏览器也不支持这个方法
        //接着再判断这个节点是否是有意义的
        while (node && nodeType != 1) { //这个节点必须是有意义的并且它的类型是标签类型
            node = node.nextSibling;
        }
        return node;
    }
}

/* @兼容性
 * @description: 获取任意一个父级元素的最后一个子级元素
 * @param {type} 标签id
 * @return: 最后一个子元素
 */

function getLastElement(element) {
    // element.lastChild--->谷歌获取的是最后一个子节点
    // element.lastChild--->ie获取的是最后一个子元素
    // element.lastElementChild--->谷歌获取的是最后一个子元素,IE8不支持
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.lastChild; //第一个子节点 ,定义一个变量接受比较严谨,万一某个浏览器也不支持这个方法
        //接着再判断这个节点是否是有意义的
        while (node && nodeType != 1) { //这个节点必须是有意义的并且它的类型是标签类型,如果不是
            node = node.previousSibling; //不是就往它前一个找
        }
        return node;
    }
}

/* @兼容性
 * @description: 为任意元素绑定任意事件
 * @param {type} 任意的元素,事件的类型,事件的处理函数
 * @return: 事件执行
 */

function addEventListener(element, type, fn) {
    //判断浏览器是否支持这个方法
    if (element.addEventListener()) {
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, fn);
    } else {
        element["on" + type] = fn;
    }
}

/* @兼容性
 * @description: 为任意元素解绑任意事件
 * @param {type} 任意的元素,事件的类型,事件的处理函数
 * @return: 事件解绑
 */

function removeEventListener(element, type, fnName) {
    if (element.removeEventListener) {
        element.removeEventListener(type, fnName, false)
    } else if (element.detachEvent) {
        element.detachEvent(type, fnName)
    } else {
        element["on" + type] = null;
    }
}

/* @匀速动画函数
 * @description: 设置任意一个元素,匀速移动到指定的目标位置(需要脱离文档流)
 * @param {type} 任意的元素,目标位置(Number),定时器每次移动的距离(Number),定时器时间
 * @return: 元素移动
 */

function animate1(element, target, distance, time) {
    // 每次开始先清理定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        //获取当前div的位置
        var current = element.offsetLeft; //数字类型,没有px
        // div每次移动多少像素
        var star = distance;
        star = current < target ? star : -star;
        // 每次移动后的目标距离
        current += star;
        // 判断当前移动后的位置是否到达目标位置
        if (Math.abs(current - target) > Math.abs(star)) {
            element.style.left = current + "px";
        } else {
            clearInterval(element.timeId);
            element.style.left = target + "px";
        }
    }, time);
}


/* @获取属性值
 * @description: 获取任意一个元素的任意一个样式的值 两个参数
 * @param {type} 任意的元素,需要获取的样式名字(字符串类型)
 * @return: 属性值
 */

function getStyle(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr] || 0;
}

/* @最终版动画函数
 * @description:传入四个参数1元素,2要改变的属性对象(json格式数据),3定时器事件(速度),4回调函数
 * @param {type}元素,对象,数字,函数
 * @return: 属性值
 */

function animate(element, json, fn) {
    clearInterval(element.timeId); //清理定时器
    //定时器,返回的是定时器的id
    element.timeId = setInterval(function () {
        var flag = true; //默认,假设,全部到达目标
        //遍历json对象中的每个属性还有属性对应的目标值
        for (var attr in json) {
            //判断这个属性attr中是不是opacity
            if (attr == "opacity") {
                //获取元素的当前的透明度,当前的透明度放大100倍
                var current = getStyle(element, attr) * 100;
                //目标的透明度放大100倍
                var target = json[attr] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step; //移动后的值
                element.style[attr] = current / 100;
            } else if (attr == "zIndex") { //判断这个属性attr中是不是zIndex
                //层级改变就是直接改变这个属性的值
                element.style[attr] = json[attr];
            } else {
                //普通的属性
                //获取元素这个属性的当前的值
                var current = parseInt(getStyle(element, attr));
                //当前的属性对应的目标值
                var target = json[attr];
                //移动的步数
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step; //移动后的值
                element.style[attr] = current + "px";
            }
            //是否到达目标
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(element.timeId); //清理定时器
            //所有的属性到达目标才能使用这个函数,前提是用户传入了这个函数
            if (fn) {
                fn();
            }
        }
        //测试代码
        console.log("目标:" + target + ",当前:" + current + ",每次的移动步数:" + step);
    }, 20);
}