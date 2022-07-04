function getLocalItem(key: string) {
    const item = localStorage.getItem(key);
    if (item) {
        return item;
    }
    return "";
}

function getLocalItemJson(key: string) {
    const item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    }
    return null;
}

function setLocalItem(key: string, value: string) {
    localStorage.setItem(key, value);
}

function removeLocalItem(key: string) {
    localStorage.removeItem(key);
}

function clearLocal() {
    localStorage.clear();
}

function getSessionItem(key: string) {
    const item = sessionStorage.getItem(key);
    if (item) {
        return item;
    }
    return "";
}

// 获取对象的是要转换
function getSessionItemJson(key: string) {
    const item = sessionStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    }
    return null;
}

function setSessionItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
}


function setSessionItemJson(key: string, obj: object) {
    sessionStorage.setItem(key, JSON.stringify(obj));
}

function removeSessionItem(key: string) {
    sessionStorage.removeItem(key);
}

function clearSession() {
    sessionStorage.clear();
}

export default {
    getLocalItem,
    getLocalItemJson,
    setLocalItem,
    removeLocalItem,
    getSessionItem,
    getSessionItemJson,
    setSessionItem,
    setSessionItemJson,
    removeSessionItem,
    clearLocal,
    clearSession
};
