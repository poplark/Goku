const on = function(element, eventName, listener, isCapture) {
    if(element.addEventListener) {
        return element.addEventListener(eventName, listener, isCapture);
    } else if(element.attachEvent) {
        return element.attachEvent(`on${eventName}`, listener);
    }
}

const off = function(element, eventName, listener, isCapture) {
    if(element.removeEventListener) {
        return element.removeEventListener(eventName, listener, isCapture);
    }
    if(element.detachEvent) {
        return element.detachEvent(`on${eventName}`, listener);
    }
}

export default {
    on: on,
    off: off
}