// 单例模式
// 优点：单例模式只会在全局作用域下创建一次实例对象，让所有需要调用的地方都共享这一单例对象
// 缺点：不能按需导入，不利于 treeSharking
class Vue {
  constructor(obj_instance) {
    this.$data = obj_instance.data;
    Observer(this.$data);
    Compile(obj_instance.el, this);
  }
}
// 双向数据绑定
// 数据改变 视图也会改变 （数据发生改变 通知相应的订阅者去更新数据）
// 视图改变 数据也会改变  (v-model 通过监听 input 事件去赋值实例中的数据)

// Object.defineProperty(操作对象, 操作属性, {
//   enumerable: true, // 可枚举
//   configurable: true, // 可以被改变
//   get() {},
//   set() {},
// });

// 数据劫持 - 监听实例里面的数据
// 只考虑对原有的数据进行劫持
// 新增加的对象 在 Vue2.x 中是通过 set 的方式进行劫持绑定的
// 访问属性的时候，会调用相应的 getter 函数，设置属性的时候，会调用相应的 setter 函数
function Observer(data_instance) {
  // 递归的出口
  if (!data_instance || typeof data_instance !== "object") return;
  const dependency = new Dependency();
  Object.keys(data_instance).forEach((key) => {
    // console.log(key);
    defineRective(data_instance, key, data_instance[key], dependency);
  });
}
function defineRective(data_instance, key, value, dependency) {
  Observer(value); // 递归 -- 子属性数据劫持
  Object.defineProperty(data_instance, key, {
    enumerable: true,
    configurable: true,
    get() {
      // console.log(`访问了属性:${key} -> 值:${value}`);
      // 订阅者加入依赖实例的数组
      // console.log("Dependency.tempWatcher ===", Dependency.tempWatcher);
      // Dependency.tempWatcher 这个就是临时保存的 订阅者实例
      Dependency.tempWatcher && dependency.addSub(Dependency.tempWatcher);
      // if (Dependency.tempWatcher) {
      //   console.log(Dependency.tempWatcher);
      // }
      return value;
    },
    set(newValue) {
      // console.log(`设置了属性:${key} -> 值:${value}`);
      value = newValue;
      dependency.notify();
      // 新属性需重新监听 data.name = {name:'ls'}
      Observer(newValue);
    },
  });
}

// HTML模板解析器 替换界面上的插值表达式
// 获取页面元素 -> 放入临时内存区域（批量修改 dom） -> 应用 Vue 数据 -> 渲染页面
function Compile(element, vm) {
  vm.$el = document.querySelector(element);
  // 创建虚拟容器 -> 拓展 这是处理万条数据 分页渲染 所需用到的 api
  const fragment = document.createDocumentFragment();
  let child;
  // 一个一个添加进去
  while ((child = vm.$el.firstChild)) {
    fragment.append(child);
  }
  fragment_complie(fragment, vm);
  vm.$el.appendChild(fragment);
}
// 替换文档
function fragment_complie(node, vm) {
  // console.log("node ===", node, "node.nodeType ===", node.nodeType);
  // input node.nodeType === 1 h1、span 也是 1
  // text node.nodeType === 3
  // 替换 插值表达式 -> 文本节点
  if (node.nodeType === 3) {
    parseInterpolation(node, vm);
    return;
  }
  if (node.nodeType === 1 && node.nodeName === "INPUT") {
    parseInput(node, vm);
    return;
  }
  // 循环遍历
  node.childNodes.forEach((child) => fragment_complie(child, vm));
}
function parseInterpolation(node, vm) {
  // \s 表示，只要出现空白就匹配 \S 表示，非空白就匹配
  const pattern = /\{\{\s*(\S+)\s*\}\}/;
  const xxx = node.nodeValue;
  const result_regex = pattern.exec(node.nodeValue);
  // console.log("result_regex ===", result_regex);
  // 为什么会出现不存在的情况？？？
  if (result_regex) {
    const arr = result_regex[1].split(".");
    // 链式调用属性 vm.$data.other.age
    const value = arr.reduce((total, current) => total[current], vm.$data);
    // console.log("value ===", value);
    node.nodeValue = xxx.replace(pattern, value);
    // 创建订阅者
    new Watcher(vm, result_regex[1], (newValue) => {
      node.nodeValue = xxx.replace(pattern, newValue);
    });
  }
}
function parseInput(node, vm) {
  // console.log("node.attributes ===", node.attributes);
  const attr = Array.from(node.attributes);
  attr.forEach((i) => {
    if (i.nodeName === "v-model") {
      // 使用 reduce 链式调用 获取 value
      const value = i.nodeValue
        .split(".")
        .reduce((total, current) => total[current], vm.$data);
      // console.log("node ===", node);
      // console.log("value ===", value);
      node.value = value;
      // 创建订阅者
      new Watcher(vm, i.nodeValue, (newValue) => {
        node.value = newValue;
      });
      node.addEventListener("input", (e) => {
        // const name = i.nodeValue;
        // vm.$data[name] = e.target.value; // 这样对于 other.age 这种无法生效 vm.$data[other.age] 不支持这样调用
        // ['other','age']
        const arr1 = i.nodeValue.split(".");
        // ['other']
        const arr2 = arr1.slice(0, arr1.length - 1);
        // vm.$data.other
        const final = arr2.reduce((total, current) => total[current], vm.$data);
        // arr1.length - 1 当前的这个 总是最后一个
        final[arr1[arr1.length - 1]] = e.target.value;
      });
    }
  });
}

// 发布订阅模式
// 有内容更新的时候就通知到相应的订阅者
// 依赖 - 收集和通知订阅者
class Dependency {
  constructor() {
    // 订阅者数组
    this.subscribers = [];
  }
  // 添加订阅者
  addSub(sub) {
    this.subscribers.push(sub);
  }
  // 通知订阅者
  notify() {
    // 遍历数组 更新依赖
    // 让订阅者自身的 update 方法去适宜的进行更新
    this.subscribers.forEach((sub) => sub.update());
  }
}
// 订阅者
class Watcher {
  constructor(vm, key, callback) {
    this.vm = vm; // Vue 示例
    this.key = key; // 需要更新的属性
    this.callback = callback; // 如何更新的函数
    // 需要想办法把订阅者实例保存到 Dependency 实例中
    // 临时属性 - 触发 getter 把订阅者实例临时的赋值给这个临时变量
    // 根据作用域的功能就能最大限度的访问这个属性
    Dependency.tempWatcher = this;
    // console.log(`用属性 ${key} 创建订阅者`);
    // 为所有的订阅者 都需要触发其 getter 操作
    // 触发 getter 只是为了临时触发 这个 key 的 getter
    // 所以不需要保存值
    getValueToChain(key, vm.$data);
    // 因为需要多次触发，所以每次设置完 都需要清空
    Dependency.tempWatcher = null;
  }
  update() {
    // 获取新值
    const value = getValueToChain(this.key, this.vm.$data);
    this.callback(value);
  }
}
function getValueToChain(value, header) {
  return value.split(".").reduce((total, current) => total[current], header);
}
