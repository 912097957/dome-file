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
    };
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
    };
    return node;
  }
}
