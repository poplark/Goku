/*
 * 获取元素的滚动距离（水平滚动以及垂直滚动）
 * 默认的获取 documentElement 的滚动距离
 * get element's scroll left and scroll top
 * default element is documentElement or body
 */
const getScroll = function(element) {
    if(element && element !== window) {
        // others?
        let x = element.scrollLeft,
            y = element.scrollTop;
        return {
            left: x,
            top: y
        }
    }
    const supportPageOffset = window.pageXOffset !== undefined;
    const isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"); // document render mode
    let x, y;
    if(supportPageOffset) {
        // IE 9+
        x = window.pageXOffset;
        y = window.pageYOffset;
    } else if(isCSS1Compat) {
        // documentElement - DOM2 core
        x = document.documentElement.scrollLeft;
        y = document.documentElement.scrollTop;
    } else {
        // compatMode - BackCompat
        x = document.body.scrollLeft;
        y = document.body.scrollTop;
    }
    return {
        left: x,
        top: y
    }
}
/*
 * 获取浏览器可视区别的大小
 * get current viewport's width and height
 */
const getViewportSize = function() {
    const supportInner = window.innerHeight !== undefined;
    const isCSS1Compat = ((document.compatMode || "") === "CSS1Compat"); // document render mode
    let width, height;
    if(supportInner) {
        // IE 9+
        width = window.innerWidth;
        height = window.innerHeight;
    } else if(isCSS1Compat) {
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
    } else {
        width = document.body.clientWidth;
        height = document.body.clientHeight;
    }
    return {
        width: width,
        height: height
    }
}
/*
 * 获取元素相对于浏览器可视区别和文档的偏移量
 * top - 是元素的上边界（算上margin）到视窗的上边界
 * left, right, bottom 依次类推
 * pageTop - 是元素上边界（算上margin）到文档的上边界
 * pageLeft 类推
 * get element's offset of viewport and document
 * top - element's top (with margin) to viewport's top
 * left, right, bottom are similar with top
 * pageTop - element's top (with margin) to document's top
 * pageLeft is similar with pageTop
 */
const getOffset = function(element) {
    const rect = element.getBoundingClientRect();
    const { left, top } = getScroll();
    const { width, height } = getViewportSize();
    return {
        top: rect.top,
        left: rect.left,
        bottom: height - rect.top - rect.height,
        right: width - rect.left - rect.width,
        pageTop: top + rect.top,
        pageLeft: left + rect.left,
    }
}
export default {
    getScroll: getScroll,
    getViewportSize: getViewportSize,
    getOffset: getOffset
}