# Vue 3 + Vite

## init Vue Project

```js
// 使用 vite 安装
npm init @vitejs/app
npm install vue-router@next vuex@next

// 使用脚手架
npm install -g @vue/cli
npm create myProject
```

## 组件化

- 通用型组件
- 业务型组件

通用型组件就是各大组件库的组件风格，包括按钮、表单、弹窗等通用功能。业务型组件包含业务的交互逻辑，包括购物车、登录注册等，会和我们不同的业务强绑定。

## 动画

> 动画的本质：“从哪里来，到哪里去，中间过程是怎么样的”。

- 使用 CSS 的属性 transition 来实现过渡效果
  - 可以通过 transition 来控制一个元素的属性的值，缓慢地变成另外一个值，这种操作就称之为过渡
  ```css
  <style>
  .box{
    background:#d88986;
    height:100px;
    transition: width 1s linear;
  }
  </style>
  ```
- 还可以通过 animation 和 keyframe 的组合实现动画
  ```css
  /* 我们指定标签的 animation 配置，给标签设置 move 动画，持续时间为两秒，线性变化并且无限循环。然后使用 @keyframes 定制 move 动画，内部定义了动画 0%、50% 和 100% 的位置，最终实现了一个方块循环移动的效果 */
  .box1{
    width:30px;
    height:30px;
    position: relative;
    background:#d88986;
    animation: move 2s linear infinite;
  }
  @keyframes move {
    0% {left:0px}
    50% {left:200px}
    100% {left:0}
  }
  ```
- Vue3 动画入门
  - transition 组件
    - 通过制定的命名规范，在 CSS 中设置过渡和动画效果，从而很方便地实现过渡效果，并且丰富了清单应用的弹窗功能
  - transition-group 实现列表元素的动画

## Vuex

对于一个数据，如果只是组件内部使用就是用 ref 管理；如果我们需要跨组件，跨页面共享的时候，我们就需要把数据从 Vue 的组件内部抽离出来，放在 Vuex 中去管理。

```js
// 安装
npm install vuex@next
```

```js
// import { createStore } from 'vuex';
import { createStore } from './mini-vuex';

// 数据流都试不允许直接修改的
// 需要提交一个 mutations 修改 state 中的数据
// 这样做的好处就是清楚的知道来源 是谁修改了
const store = createStore({
    state() {
        return { count: 666 };
    },
    getters: {
        double(state) {
            return state.count * 2;
        }
    },
    // mutation 的设计就是用来实现同步地修改数据
    mutations: {
        add(state) {
            state.count++;
        }
    },
    // actions 是实现异步处理
    // action 并不是直接修改数据，而是通过 mutations 去修改
    actions: {
        asyncAdd({ commit }) {
            setTimeout(() => {
                commit('add');
            }, 1000);
        }
    }
});

export default store;
```

##  Vue-Router

```js
import { ref, inject } from 'vue';
import RouterLink from './RouterLink.vue';
import RouterView from './RouterView.vue';
const ROUTER_KEY = '__router__';

function createRouter(options) {
    return new Router(options);
}

function useRouter() {
    return inject(ROUTER_KEY);
}

function createWebHashHistory() {
    function bindEvents(fn) {
        window.addEventListener('hashchange', fn);
    }
    return {
        bindEvents,
        url: window.location.hash.slice(1) || '/'
    };
}
class Router {
    constructor(options) {
        this.history = options.history;
        this.routes = options.routes;
        this.current = ref(this.history.url);

        this.history.bindEvents(() => {
            this.current.value = window.location.hash.slice(1);
        });
    }
    install(app) {
        app.provide(ROUTER_KEY, this);
        app.component('router-link', RouterLink);
        app.component('router-view', RouterView);
    }
}

export { createRouter, createWebHashHistory, useRouter };
```

## JSX 和 Template

**JSX**

JSX 可以支持更动态的需求。而 template 则因为语法限制原因，不能够像 JSX 那样可以支持更动态的需求。这是 JSX 相比于 template 的一个优势。

JSX 相比于 template 还有一个优势，是可以在一个文件内返回多个组件，我们可以像下面的代码一样，在一个文件内返回 Button、Input、Timeline 等多个组件。

```jsx
export const Button = (props,{slots})=><button {...props}>slots.default()</button>
export const Input = (props)=><input {...props} />
export const Timeline = (props)=>{
  ...
}
```

**Template**

template 的语法是固定的，我们按照这种固定格式的语法书写，这样 Vue 在编译层面就可以很方便地去做静态标记的优化。

在 template 解析的结果中，有以下几个性能优化的方面：

- 首先，静态的标签和属性会放在 _hoisted 变量中，并且放在 render 函数之外。这样，重复执行 render 的时候，代码里的 h1 这个纯静态的标签，就不需要进行额外地计算，并且静态标签在虚拟 DOM 计算的时候，会直接越过 Diff 过程。
- 然后是 @click 函数增加了一个 cache 缓存层，这样实现出来的效果也是和静态提升类似，尽可能高效地利用缓存。
- 最后是，由于在下面代码中的属性里，那些带冒号的属性是动态属性，因而存在使用一个数字去标记标签的动态情况。
- 比如在 p 标签上，使用 8 这个数字标记当前标签时，只有 props 是动态的。而在虚拟 DOM 计算 Diff 的过程中，可以忽略掉 class 和文本的计算，这也是 Vue 3 的虚拟 DOM 能够比 Vue 2 快的一个重要原因。

```js

import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = { id: "app" }
const _hoisted_2 = /*#__PURE__*/_createElementVNode("h1", null, "技术摸鱼", -1 /* HOISTED */)
const _hoisted_3 = ["id"]

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", {
      onClick: _cache[0] || (_cache[0] = ()=>_ctx.console.log(_ctx.xx)),
      name: "hello"
    }, _toDisplayString(_ctx.name), 1 /* TEXT */),
    _hoisted_2,
    _createElementVNode("p", {
      id: _ctx.name,
      class: "app"
    }, "极客时间", 8 /* PROPS */, _hoisted_3)
  ]))
}

// Check the console for the AST
```

我们实现业务需求的时候，也是优先使用 template，动态性要求较高的组件使用 JSX 实现