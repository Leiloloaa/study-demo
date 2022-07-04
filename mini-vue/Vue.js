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
function Observer(data_instance) {
  // 递归的出口
  if (!data_instance || typeof data_instance !== "object") return;
  const dependency = new Dependency();
  Object.keys(data_instance).forEach((key) => {
    let _value = data_instance[key];
    Observer(_value); // 递归 -- 子属性数据劫持
    Object.defineProperty(data_instance, key, {
      enumerable: true,
      configurable: true,
      get() {
        // console.log(`访问了属性:${key} -> 值:${_value}`);
        // 订阅者加入依赖实例的数组
        // console.log(Dependency.temp);
        Dependency.temp && dependency.addSub(Dependency.temp);
        return _value;
      },
      set(newValue) {
        // console.log(`设置了属性:${key} -> 值:${_value}`);
        _value = newValue;
        dependency.notify();
        Observer(newValue);
      },
    });
  });
}

// HTML模板解析器 替换界面上的插值表达式
// 获取页面元素 -> 放入临时内存区域（批量修改 dom） -> 应用 Vue 数据 -> 渲染页面
function Compile(element, vm) {
  vm.$el = document.querySelector(element);
  const fragment = document.createDocumentFragment();
  let child;
  // 一个一个添加进去
  while ((child = vm.$el.firstChild)) {
    fragment.append(child);
  }
  fragment_complie(fragment);
  // 替换文档
  function fragment_complie(node) {
    const pattern = /\{\{\s*(\S+)\s*\}\}/;
    // 文本节点
    if (node.nodeType === 3) {
      const xxx = node.nodeValue;
      const result_regex = pattern.exec(node.nodeValue);
      if (result_regex) {
        const arr = result_regex[1].split(".");
        // 链式调用属性
        const value = arr.reduce((total, current) => total[current], vm.$data);
        node.nodeValue = xxx.replace(pattern, value);
        // 创建订阅者
        new Watcher(vm, result_regex[1], (newValue) => {
          node.nodeValue = xxx.replace(pattern, newValue);
        });
      }
      return;
    }

    if (node.nodeType === 1 && node.nodeName === "INPUT") {
      const attr = Array.from(node.attributes);
      attr.forEach((i) => {
        if (i.nodeName === "v-model") {
          const value = i.nodeValue
            .split(".")
            .reduce((total, current) => total[current], vm.$data);
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
            const final = arr2.reduce(
              (total, current) => total[current],
              vm.$data
            );
            // arr1.length - 1 当前的这个 总是最后一个
            final[arr1[arr1.length - 1]] = e.target.value;
          });
        }
      });
    }
    node.childNodes.forEach((child) => fragment_complie(child));
  }
  vm.$el.appendChild(fragment);
}

// 发布订阅模式
// 有内容更新的时候就通知到相应的订阅者

// 依赖 - 收集和通知订阅者
class Dependency {
  constructor() {
    this.subscribers = [];
  }
  // 添加订阅者
  addSub(sub) {
    this.subscribers.push(sub);
  }
  // 通知订阅者
  notify() {
    this.subscribers.forEach((sub) => sub.update());
  }
}

// 订阅者
class Watcher {
  constructor(vm, key, callback) {
    this.vm = vm; // Vue 示例
    this.key = key; // 需要更新的属性
    this.callback = callback; // 如何更新的函数
    // TODO
    // 临时属性 - 触发 getter
    Dependency.temp = this;
    key.split(".").reduce((total, current) => total[current], vm.$data);
    Dependency.temp = null;
  }
  update() {
    const value = this.key
      .split(".")
      .reduce((total, current) => total[current], this.vm.$data);
    this.callback(value);
  }
}
