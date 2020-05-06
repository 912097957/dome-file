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