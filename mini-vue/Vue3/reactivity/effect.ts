let activeEffect
export function effect(fn) {
    // 为了方便扩展 实现一个 ReactiveEffect 类
    const _effect = new ReactiveEffect(fn)
    _effect.run()
};

class ReactiveEffect {
    _fn
    constructor(fn) {
        this._fn = fn
    }
    run() {
        console.log('this ===', this);
        // 存入 实例 因为可能还有其他方法 例如 调度函数 schedule、stop 等
        activeEffect = this
        // 执行 fn 也就是 传入的回调函数
        this._fn()
    }
}

// 简单实现了 effect 函数之后，就要考虑 收集依赖 和 触发依赖了
// 在用户定义的时候收集相关的依赖，用户改变的时候触发依赖（通知相关的函数 fn 进行改变）

// track v.追踪 收集依赖函数
// 思考：用户定义了两个响应式变量，Vue 中如何存储，并能及时的通知呢？
// const userInfo = reactive({ name: 'zs', age: 18, gender: 1 })
// const goodsInfo = reactive({ name: 'xiao mi', price: 2200 })

// Vue 的解决方案
// 全局定义一个 weakMap 集合(为什么是 weakMap？全局一个那如何区分不同组件的同名变量？)
// weakMap 的作用是来收集全局的 reactive 变量，它的 key 是 userInfo
// 然后再用一个 map 来收集这个对象中的 key，如 name，age，gender 等
// 最后再用一个 set 来收集能改变 name，age，gender 的 fn(set 去重，并可能存在多个 fn)
const targetMap = new WeakMap()
export function track(target, key) {
    // target 是 userInfo
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        // 如果不存在 就需要创建
        depsMap = new Map()
        // 添加
        targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Set()
        depsMap.set(key, dep)
    }
    // dep 需要存储 fn
    // 因为在 effect 的时候才能拿到 fn
    // 所以定义一个全局变量，临时接收 fn
    dep.add(activeEffect)
};

// trigger v.触发 触发依赖函数
// 作用：当执行 set 的时候，找到 targetMap 中相应的 dep，然后去遍历相关的 fn
export function trigger(target, key) {
    let depsMap = targetMap.get(target)
    console.log('targetMap ===', targetMap);
    let dep = depsMap.get(key)
    dep.forEach(effect => {
        console.log('effect ===', effect);
        effect.run()
    });
};

// ```js
// targetMap = {
//  target: {
//    key1: [回调函数1，回调函数2],
//    key2: [回调函数3，回调函数4],
//  },
//  target1:{
//    key3: [回调函数5]
//  }  
// }
// ```