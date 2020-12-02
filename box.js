const log = console.log.bind(console)

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `${selector} 写错了, 请仔细检查`
        alert(s)
        return null
    } else {
        return element
    }
}

//绑定所有一类元素
const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `${selector} 写错了, 请仔细检查`
        alert(s)
        return []
    } else {
        return elements
    }
}
const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const removeClassAll = function(className) {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.remove(className)
    }
}

//绑定事件
const bindAll = function(selector, eventName, callback) {
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

// find 函数可以查找 element 的所有子元素
const find = function(element, selector) {
    let e = element.querySelector(selector)
    if (e === null) {
        let s = `选择器 ${selector} 写错了, 请仔细检查`
        alert(s)
        return null
    } else {
        return e
    }
}

// 实现 closestClass 函数
const closestClass = function(element, className) {
    let e = element

    while (e !== null) {
        if (e.classList.contains(className)) {
            return e
        } else {
            e = e.parentElement
        }
    }
    // 如果找到最上面都没有找到, 直接返回 null
    return null
}

// 实现 closestId 函数
const closestId = function(element, idName) {
    let e = element

    while (e !== null) {
        if (e.id === idName) {
            return e
        } else {
            e = e.parentElement
        }
    }
    // 如果找到最上面都没有找到, 直接返回 null
    return null
}

const closestTag = function(element, tagName) {
    let e = element

    while (e !== null) {
        //都转换为大写字母来比较
        if (e.tagName.toUpperCase() === tagName.toUpperCase()) {
            return e
        } else {
            e = e.parentElement
        }
    }
    // 如果找到最上面都没有找到, 直接返回 null
    return null
}

const closest = function(element, selector) {
    let c = selector[0]
    if (c === '.') {
        // class 选择器
        let className = selector.slice(1)
        return closestClass(element, className)
    } else if (c === '#') {
        // id 选择器
        let idName = selector.slice(1)
        return closestId(element, idName)
    } else {
        // 元素选择器
        let tagName = selector
        return closestTag(element, tagName)
    }
}
