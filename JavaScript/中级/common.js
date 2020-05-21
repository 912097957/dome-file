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

function animate(element, target, distance, time) {
    // 每次开始先清理定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        //获取当前div的位置
        var current = element.offsetLeft;//数字类型,没有px
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

/* @变速动画函数
 * @description: 设置任意一个元素,缓速移动到指定的目标位置(需要脱离文档流)
 * @param {type} 任意的元素,目标位置(Number),定时器时间
 * @return: 元素移动
 */

function animate1(element, target, time) {
    //每点击一次按钮都要先清理一次定时器(不管有没有)
    clearInterval(element.timeId);
    //定时器的一个id值存储到了对象的一个属性中
    element.timeId = setInterval(function () {
        //获取元素当前的位置
        var current = element.offsetLeft;
        //每次移动的距离
        var temp = (target - current) / 10;
        temp = temp > 0 ? Math.ceil(temp) : Math.floor(temp);
        //移动到当前位置
        current += temp;
        element.style.left = current + "px";
        //测试代码:
        console.log("目标位置:" + target + ",当前位置:" + current + ",每次移动步数:" + temp);
        //判断:如果我当前的位置距离目标位置大于我每次走的步数,我就照常走
        if (current == target) {
            clearInterval(element.timeId);
        }
    }, time);
}