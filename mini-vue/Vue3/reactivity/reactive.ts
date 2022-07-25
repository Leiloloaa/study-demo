import { track, trigger } from "./effect";

export function reactive(target) {
    // 返回一个构造器函数
    return createReactiveObject(target);
};

function createReactiveObject(target) {
    const proxy = new Proxy(target, {
        get(target, key) {
            console.log(`get key ==> ${target[key]}`);
            // 为什么要使用 Reflect？
            // 1、首先 proxy 的代理方法和 reflect 名称相同 多达 13 中拦截方法
            // 2、其次 reflect 可以接收 3 个参数 receiver，可以把它理解为函数调用过程中的 this
            const res = target[key]
            track(target, key)
            return res
        },
        set(target, key, value) {
            console.log(`set key ==> ${value}`);
            target[key] = value
            trigger(target, key)
            return target[key]
        }
    });
    return proxy
}