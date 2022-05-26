export const isObejct = (key) => {
    return Object.prototype.toString.call(key).slice(8, -1).toLowerCase() == 'object'
};

export const isFunction = (key) => {
    return typeof key === 'function'
};