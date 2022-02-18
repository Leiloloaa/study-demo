// 过滤数字
export function sliceNumber(value: any, ...args: any[]) {
    if (!value) {
        return value;
    } else {
        // 向上取整
        value = Math.floor(value * 100) / 100;
        const xsd = value.toString().split('.');
        // 等于
        if (xsd.length === 1) {
            value = value.toString() + '.00';
            return value;
        }
        // 大于一位
        if (xsd.length > 1) {
            // 小于两位
            if (xsd[1].length < 2) {
                value = value.toString() + '0';
            }
            return value;
        }
    }
};