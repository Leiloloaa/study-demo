import React, { Fragment } from 'react';
// React 介绍
// React 是一个用于构建用户界面的 JAVASCRIPT 库。
// React 主要用于构建UI， 很多人认为 React 是 MVC 中的 V（ 视图）。
// React 起源于 Facebook 的内部项目， 用来架设 Instagram 的网站， 并于 2013 年 5 月开源。
// React 拥有较高的性能， 代码逻辑非常简单， 越来越多的人已开始关注和使用它

// React 需手动实现双向数据绑定 通过 react 中的状态管理

// React 的基本思想就是组件 每一个组件 同时也 可以看作是一个类 都继承自 React.Component
import ListItem from './ListItem';
class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    // 实现双向数据绑定第一步 在 state 中声明
    this.state = {
      value: '',
      list: [
        { title: '吃饭', checked: false },
        { title: '睡觉', checked: false },
        { title: '打豆豆', checked: false },
      ],
    };
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  addData() {
    let title = this.state.value;
    // 一定要注意，不能直接修改 state 的数据，虽然可以实现，但是 react 中特别强调了！如果这样做在后期的性能优化上会有很多麻烦
    // 所以修改 state 中的数据的时候，我们会定义一个局部变量，用来改变数据
    // 用 ... 剩余参数的方式给数组添加数据 更方便 而且更直接
    let tempList = [
      ...this.state.list,
      {
        title: title,
        checked: false,
      },
    ];
    // 注意 this.setState 是异步的方法
    this.setState({
      list: tempList,
      value: '',
    });
  }

  checkBoxState(key) {
    let tempList = this.state.list;
    tempList[key].checked = !tempList[key].checked;
    this.setState({
      list: tempList,
    });
  }

  removeItem(key) {
    let tempList = this.state.list;
    tempList.splice(key, 1);
    this.setState({
      list: tempList,
    });
  }

  // render 函数中 写 JSX
  // class -> className for -> htmlFor 因为 class 和 for 都是 js 中的关键字
  // 但是 React 中 map 循环代替了 for 循环
  // map 中一定要有 return 并且要注意 return 的使用 它只能返回一行 多行需要加括号
  render() {
    return (
      // Fragment 是 react 提供给我们使用的 一个根节点 不会渲染
      <Fragment>
        {/* 在 jsx 中写注释，推荐使用这种方式 */}
        <header className="title">
          TodoList: 　
          <input
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />{' '}
          {'   '}
          {/* {this.state.value} */}
          <button onClick={this.addData.bind(this)}>添加</button>
        </header>
        <h2>待办事件</h2>
        <ul>
          {this.state.list.map((item, key) => {
            return (
              // 在 react 中 key = key+item 这是比较合理的
              // true && expression 始终计算为 expression，并且 false && expression 始终计算为 false
              // dangerouslySetInnerHTML={{ __html: item.title }} 可以使我们直接在文本框中输入 html 标签
              // 当然我们是推荐这种用法的 因为 JSX 可以防止注入攻击（cro）解析器会把代码转换成字符串
              !item.checked && (
                <ListItem
                  key={key + item}
                  index={key}
                  content={item.title}
                  checked={item.checked}
                  checkBoxState={this.checkBoxState.bind(this)}
                  removeItem={this.removeItem.bind(this)}
                />
                // <li key={key + item}>
                //   <input
                //     type="checkbox"
                //     checked={item.checked}
                //     onChange={this.checkBoxState.bind(this, key)}
                //   />
                //   {item.title}---{'  '}
                //   <button onClick={this.removeItem.bind(this, key)}>
                //     删除
                //   </button>
                // </li>
              )
            );
          })}
        </ul>
        <h2>已完成事件</h2>
        <ul>
          {this.state.list.map((item, key) => {
            return (
              item.checked && (
                <ListItem
                  key={key + item}
                  index={key}
                  content={item.title}
                  checked={item.checked}
                  checkBoxState={this.checkBoxState.bind(this)}
                  removeItem={this.removeItem.bind(this)}
                />
                // <li key={key + item}>
                //   <input
                //     type="checkbox"
                //     checked={item.checked}
                //     onChange={this.checkBoxState.bind(this, key)}
                //   />
                //   {item.title}---{'  '}
                //   <button onClick={this.removeItem.bind(this, key)}>
                //     删除
                //   </button>
                // </li>
              )
            );
          })}
        </ul>
      </Fragment>
    );
  }
}

export default ToDoList;
